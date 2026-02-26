import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import {
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// ✅ CORRECT CAMERA IMPORT (YOUR REQUIREMENT)
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-attdenc-out',
  templateUrl: './attdenc-out.page.html',
  styleUrls: ['./attdenc-out.page.scss'],

})
export class AttdencOUTPage implements OnInit {

  currentTime: string;
  time = false;
  time2 = false;
  temp: any;
  latitude: number;
  longitude: number;
  accuracy: number;
  address: any;

  formattedInTime: string;
  latest_adress: any;
  clicked: string;

  dataToSend = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };

  Attdence_Data: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
    Latitude: "",
    Longitude: "",
    imageData: '',
  };

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  show = true;
  hidd = false;
  button = false;

  constructor(

    private http: HttpClient,
    public router: Router,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,

    // ✅ CAMERA ADDED HERE

  ) {
    this.run();
    this.checkCameraPermission()
    this.chckAppGpsPermission();
    this.currentTime = new Date().toLocaleTimeString();
  }

  ngOnInit() {
    this.latest_adress = localStorage.getItem("address");
  }

  // CHECK GPS PERMISSION
async checkCameraPermission() {
  const result = await this.androidPermissions.checkPermission(
    this.androidPermissions.PERMISSION.CAMERA
  );

  if (!result.hasPermission) {
    await this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.CAMERA
    );
  }
}



  chckAppGpsPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            this.requestToSwitchOnGPS();
          } else {
            this.askGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }

  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            (error) => {
              alert(error);
            }
          );
      }
    });
  }

  requestToSwitchOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          this.getGeolocation();
        },
        (error) => alert(JSON.stringify(error))
      );
  }
async getGeolocation() {
  const loading = await this.loadingCtrl.create({
    message: 'Getting location...',
    spinner: 'circles',
  });
  await loading.present();

  try {
    const resp = await this.geolocation.getCurrentPosition({
      enableHighAccuracy: false, // ⚡ FAST
      timeout: 10000,
      maximumAge: 30000, // reuse recent location
    });

    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    this.accuracy = resp.coords.accuracy;

    this.Attdence_Data.Latitude = this.latitude;
    this.Attdence_Data.Longitude = this.longitude;

    console.log(this.latitude, this.longitude);

    // Fetch address silently (non-blocking)
    this.getGeoencoder(this.latitude, this.longitude);

  } catch (error) {
    console.error('Error getting location', error);
    this.showToast('Unable to fetch location', 'danger');
  } finally {
    loading.dismiss();
  }
}

// ===============================
// FAST REVERSE GEOCODER (NO LOADER)
// ===============================
async getGeoencoder(latitude: number, longitude: number) {
  try {
    const result: NativeGeocoderResult[] =
      await this.nativeGeocoder.reverseGeocode(
        latitude,
        longitude,
        {
          useLocale: true,
          maxResults: 1, // ⚡ speed boost
        }
      );

    if (result?.length) {
      this.address = this.generateShortCleanAddress(result[0]);
      console.log('Address:', this.address);
    } else {
      this.address = 'Address not found';
    }
  } catch (error) {
    console.error('Error getting geocode', error);
    this.address = 'Unable to fetch address';
  }
}

// ===============================
// CLEAN SHORT ADDRESS FORMATTER
// ===============================
generateShortCleanAddress(addressObj: any): string {
  const parts: string[] = [];

  if (addressObj.subThoroughfare) parts.push(addressObj.subThoroughfare);
  if (addressObj.thoroughfare) parts.push(addressObj.thoroughfare);
  if (addressObj.subLocality) parts.push(addressObj.subLocality);
  if (addressObj.locality) parts.push(addressObj.locality);

  if (addressObj.administrativeArea) {
    let state = addressObj.administrativeArea;

    const stateShortcuts: any = {
      'uttar pradesh': 'UP',
      'madhya pradesh': 'MP',
      maharashtra: 'MH',
      delhi: 'DL',
      karnataka: 'KA',
      'tamil nadu': 'TN',
      'west bengal': 'WB',
      bihar: 'BR',
      rajasthan: 'RJ',
      gujarat: 'GJ',
    };

    state = stateShortcuts[state.toLowerCase()] || state;
    parts.push(state);
  }

  const uniqueParts = [...new Set(parts)];

  return addressObj.postalCode
    ? `${uniqueParts.join(', ')} - ${addressObj.postalCode}`
    : uniqueParts.join(', ');
}



  // CHECK ATTENDANCE STATUS
  async run() {
    const loader = await this.loadingCtrl.create({
      message: 'Checking attendance status...',
    });
    await loader.present();

    this.http
      .post('https://techxpertindia.in/api/get_employee_attendance_status.php', this.dataToSend)
      .subscribe(
        (data: any) => {
          const InTime = data?.data?.attendace_records?.InTime;

          if (InTime) {
            const [h, m] = InTime.split(':').map(Number);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const hr12 = h % 12 || 12;

            this.formattedInTime = `${hr12}:${m.toString().padStart(2, '0')} ${ampm}`;
          }

          const outStatus = data.OutTimeStatus;

          if (outStatus == '1') {
            this.hidd = true;
            this.show = false;
            this.button = false;
            this.time2 = true;
            this.time = false;
          } else {
            this.hidd = false;
            this.show = true;
            this.button = true;
            this.time = true;
            this.time2 = false;
          }

          loader.dismiss();
        }
      );
  }

  // SUBMIT OUT
  async attdence_out() {
    if (!this.Attdence_Data.imageData) {
      await this.capture();
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Submitting attendance...',
    });

    await loader.present();

    this.http
      .post(
        'https://techxpertindia.in/api/punch_out_employee_attendance.php',
        this.Attdence_Data
      )
      .subscribe(
        async () => {
          await loader.dismiss();
          this.router.navigateByUrl('vendor-new-page');
        },
        async (error) => {
          console.error(error);
          await loader.dismiss();
        }
      );
  }

  // ===================================
  //  📸 FINAL CAMERA CODE (CORDOVA)
  // ===================================
async capture(): Promise<void> {
  const loading = await this.loadingCtrl.create({
    message: 'Opening camera...',
    spinner: 'circles',
  });

  await loading.present();

  try {
    const photo = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.Base64,  // base64 output
      source: CameraSource.Camera,          // open camera
      direction: CameraDirection.Front,     // front camera
      saveToGallery: false
    });

    // BASE64 STRING (no prefix)
    const cleanBase64 = photo.base64String || '';

    // For preview
    this.clicked = 'data:image/jpeg;base64,' + cleanBase64;

    // For API
    this.Attdence_Data.imageData = cleanBase64;

  } catch (err) {
    console.error('Camera error:', err);
    this.showToast('Camera error. Try again.', 'danger');
  } finally {
    loading.dismiss();
  }
}
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }
}
