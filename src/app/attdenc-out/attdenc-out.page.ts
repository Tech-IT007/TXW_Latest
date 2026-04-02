import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraSource, CameraResultType, CameraDirection } from '@capacitor/camera';

@Component({
  selector: 'app-attdenc-out',
  templateUrl: './attdenc-out.page.html',
  styleUrls: ['./attdenc-out.page.scss'],
})
export class AttdencOUTPage implements OnInit {

  currentTime = '';
  latitude: number;
  longitude: number;
  address = '';

  clicked: string = '';

  Attdence_Data: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
    Latitude: "",
    Longitude: "",
    imageData: '',
  };

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }

  ngOnInit() {
    this.initGPS();
  }

  // ---------- GPS ----------
  initGPS() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(res => {
      res.hasPermission ? this.enableGPS() : this.askGPS();
    });
  }

  askGPS() {
    this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(() => this.enableGPS());
  }

  enableGPS() {
    this.locationAccuracy.request(
      this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
    ).then(() => this.getLocation());
  }

  async getLocation() {
    try {
      const pos = await this.geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 8000
      });

      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;

      this.Attdence_Data.Latitude = this.latitude;
      this.Attdence_Data.Longitude = this.longitude;

      const res = await this.nativeGeocoder.reverseGeocode(
        this.latitude,
        this.longitude,
        this.geoencoderOptions
      );

      if (res.length) {
        this.address = `${res[0].locality}, ${res[0].administrativeArea}`;
      }

    } catch {
      this.showToast('Location error', 'danger');
    }
  }

  // ---------- CAMERA ----------
  async capture() {
    try {
      const photo = await Camera.getPhoto({
        quality: 40,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        direction: CameraDirection.Front
      });

      const base64 = photo.base64String;
      if (!base64) return;

      this.clicked = `data:image/jpeg;base64,${base64}`;
      this.Attdence_Data.imageData = base64;

    } catch {
      this.showToast('Camera error', 'danger');
    }
  }

  // ---------- SUBMIT ----------
  async attdence_out() {

    if (!this.latitude) {
      this.showToast('Location required', 'danger');
      return;
    }

    if (!this.Attdence_Data.imageData) {
      await this.capture();
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Submitting...' });
    await loader.present();

    this.http.post('https://techxpertindia.in/api/punch_out_employee_attendance.php', this.Attdence_Data)
      .subscribe(
        async () => {
          this.showToast('Attendance Out Success', 'success');
          this.router.navigateByUrl('vendor-new-page');
          loader.dismiss().catch(() => {});
        },
        async () => {
          this.showToast('Failed', 'danger');
          loader.dismiss().catch(() => {});
        }
      );
  }

  async showToast(msg: string, color = 'primary') {
    const t = await this.toastController.create({ message: msg, duration: 3000, color });
    t.present();
  }
}