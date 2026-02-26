import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { Camera, CameraSource, CameraResultType, CameraDirection } from '@capacitor/camera';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare let window: any;

@Component({
  selector: 'app-attdenc-in',
  templateUrl: './attdenc-in.page.html',
  styleUrls: ['./attdenc-in.page.scss'],
 // IMPORTANT FOR AWESOME CAMERA
})
export class AttdencINPage implements OnInit, OnDestroy {

  readonly TEST_UPLOAD_IMAGE_PATH = '/mnt/data/78ba8473-10e4-4ab2-a8be-6af98f490ebf.png';

  currentTime: string = '';
  address: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  accuracy: number | null = null;
  clicked: string | null = null;
  img_data: string | null = null;

  Attdence_Data: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
    Latitude: "",
    Longitude: "" ,
    imageData: '',
  };

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  latest_adress: any = null;
  private destroy$ = new Subject<void>();
  isMirrored: boolean;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    private ngZone: NgZone,

  ) {
    this.latest_adress = localStorage.getItem('address') || '';

    setInterval(() => {
      this.ngZone.run(() => {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      });
    }, 1000);
  }

  ngOnInit() {
   this.
  chckAppGpsPermission() 
  this.checkCameraPermission() 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
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
    message: 'Fetching location...',
    spinner: 'circles',
  });
  await loading.present();

  try {
    const position = await this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 8000,          // ⏱ max wait 8 sec
      maximumAge: 30000       // ♻ allow cached location (VERY FAST)
    });

    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.accuracy = position.coords.accuracy;

    this.Attdence_Data.Latitude = this.latitude;
    this.Attdence_Data.Longitude = this.longitude;

    console.log('Lat:', this.latitude);
    console.log('Lng:', this.longitude);
    console.log('Accuracy:', this.accuracy);

    // ⚡ reverse geocode WITHOUT loader
    this.getGeoencoderFast(this.latitude, this.longitude);

  } catch (error) {
    console.error('GPS Error:', error);
    this.showToast('Unable to fetch location', 'danger');
  } finally {
    loading.dismiss();
  }
}
async getGeoencoderFast(latitude: number, longitude: number) {
  try {
    const result = await this.nativeGeocoder.reverseGeocode(
      latitude,
      longitude,
      {
        useLocale: true,
        maxResults: 1   // 🚀 only 1 result = faster
      }
    );

    if (result && result.length > 0) {
      this.address = this.generateShortCleanAddress(result[0]);
      console.log('Address:', this.address);
    } else {
      this.address = 'Address not found';
    }

  } catch (error) {
    console.error('Geocoder Error:', error);
    this.address = 'Unable to fetch address';
  }
}


generateShortCleanAddress(a: any): string {
  const parts = [];

  if (a.subLocality) parts.push(a.subLocality);
  if (a.locality) parts.push(a.locality);

  const stateMap = {
    'uttar pradesh': 'UP',
    'madhya pradesh': 'MP',
    'maharashtra': 'MH',
    'delhi': 'DL',
    'karnataka': 'KA',
    'tamil nadu': 'TN',
    'west bengal': 'WB',
    'bihar': 'BR',
    'rajasthan': 'RJ',
    'gujarat': 'GJ',
  };

  if (a.administrativeArea) {
    const stateKey = a.administrativeArea.toLowerCase();
    parts.push(stateMap[stateKey] || a.administrativeArea);
  }

  return a.postalCode
    ? `${parts.join(', ')} - ${a.postalCode}`
    : parts.join(', ');
}






  // ---------------------------------------------------------
  // ✔ ADVANCED CORDOVA CAMERA (SELFIE ONLY)
  // ---------------------------------------------------------
async capture(): Promise<void> {

  const loading = await this.loadingCtrl.create({
    message: 'Opening camera...',
    spinner: 'circles'
  });

  await loading.present();

  try {

    const photo = await Camera.getPhoto({
      quality: 30,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      direction: CameraDirection.Front
    });

    // Base64 string (no prefix)
    this.img_data = photo.base64String;

    // For preview (with prefix)
    this.clicked = 'data:image/jpeg;base64,' + photo.base64String;

    // Enable mirror preview
    this.isMirrored = true;

    // For API submit
    this.Attdence_Data.imageData = photo.base64String;

  } catch (err) {
    console.error('Camera error:', err);
    this.showToast('Camera error. Try again.', 'danger');
  } finally {
    try {
      await loading.dismiss();
    } catch {}
  }
}


  async attdence_in(): Promise<void> {
   
    const loading = await this.loadingCtrl.create({
      message: 'Submitting attendance...',
      spinner: 'dots',
    });
    await loading.present();

    const url = 'https://techxpertindia.in/api/punch_in_employee_attendance.php';

    this.http.post(url, this.Attdence_Data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          loading.dismiss();
          this.showToast('Attendance submitted!', 'success');
          this.router.navigateByUrl('vendor-new-page');
        },
       
      );
  }



  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
