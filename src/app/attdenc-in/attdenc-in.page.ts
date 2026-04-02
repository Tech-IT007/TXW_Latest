import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraSource, CameraResultType, CameraDirection } from '@capacitor/camera';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-attdenc-in',
  templateUrl: './attdenc-in.page.html',
  styleUrls: ['./attdenc-in.page.scss'],
})
export class AttdencINPage implements OnInit, OnDestroy {

  currentTime = '';
  latitude: number;
  longitude: number;
  address = '';

  clicked: string = '';
  img_data: string = '';

  private destroy$ = new Subject<void>();

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
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private ngZone: NgZone
  ) {
    setInterval(() => {
      this.ngZone.run(() => {
        this.currentTime = new Date().toLocaleTimeString();
      });
    }, 1000);
  }

  ngOnInit() {
    this.chckAppGpsPermission();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ---------- GPS ----------
  chckAppGpsPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(res => {
      res.hasPermission ? this.requestToSwitchOnGPS() : this.askGPSPermission();
    });
  }

  askGPSPermission() {
    this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(() => this.requestToSwitchOnGPS());
  }

  requestToSwitchOnGPS() {
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

      this.getAddress(this.latitude, this.longitude);

    } catch {
      this.showToast('Location error', 'danger');
    }
  }

  async getAddress(lat: number, lng: number) {
    try {
      const res = await this.nativeGeocoder.reverseGeocode(lat, lng, this.geoencoderOptions);
      if (res.length) {
        this.address = `${res[0].locality}, ${res[0].administrativeArea}`;
        localStorage.setItem('address', this.address);
      }
    } catch {}
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
      this.img_data = base64;
      this.Attdence_Data.imageData = base64;

    } catch {
      this.showToast('Camera error', 'danger');
    }
  }

  // ---------- SUBMIT ----------
  async attdence_in() {

    if (!this.latitude) {
      this.showToast('Location required', 'danger');
      return;
    }

    if (!this.img_data) {
      await this.capture();
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Submitting...' });
    await loader.present();

    this.http.post('https://techxpertindia.in/api/punch_in_employee_attendance.php', this.Attdence_Data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        async (res: any) => {
          this.showToast('Attendance In Success', 'success');
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