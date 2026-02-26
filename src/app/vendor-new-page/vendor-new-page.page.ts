import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {LocalNotifications,ELocalNotificationTriggerUnit} from '@awesome-cordova-plugins/local-notifications/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import confetti from 'canvas-confetti';
import { Storage } from '@ionic/storage-angular';

import { ModalController } from '@ionic/angular';
import { DashboardModalPage } from '../dashboard-modal/dashboard-modal.page';
declare let window: any;
let cordova: any;
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { NotificationService } from '../services/notification.service';
import { interval, Subscription } from 'rxjs';
import { error } from 'console';
@Component({
  selector: 'app-vendor-new-page',
  templateUrl: './vendor-new-page.page.html',
  styleUrls: ['./vendor-new-page.page.scss'],
})
export class VendorNewPagePage implements OnInit {
notifications: any[] = [];
isNotificationOpen = false;

lastNotificationCount: number = 0;
  out: any;
  showAttendancePopup = false;
  notificationSubscription: Subscription;
  
  in: any;
  role: any;
  status: boolean;
    clickedImage: string;
  vendor: boolean;
  employname: any;
  emp: any = {};
  intime_status: any;
  outtime_status: any;
  bannerdata: any;
  loction_status: any;
  location_enable: boolean;
  users: any;
  obj: any ={}
  notifiction_counter: any;

  constructor(
    public router: Router,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
          private nativeAudio: NativeAudio,
          private notificationService: NotificationService
  ) { 
   
  }

  currentTime: string;

  // Readable Address
  address: any;

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };
edit_profile = {
  EmployeeID : localStorage.getItem('EmployeeID'),
  imageData : ''
}
  set: any;
  service_id: any;
    notification_counter: number = 0;
  temp: any;
  la: any;
  log: any;
  toast: any;
  filterTerm: string;
  message: any;
  picks: any;

  Role: any;
  show: Boolean;

ionViewWillEnter() {
  
  this.att();
  this.showPopupOnce();
  this.preloadSound();
  this.Status_role();
  this.vendor_roles();
  this.profile();

  const employeeId = localStorage.getItem('EmployeeID');

  // Always clear old subscription
  if (this.notificationSubscription) {
    this.notificationSubscription.unsubscribe();
    this.notificationSubscription = null;
  }

  // ✅ Start polling ONLY if EmployeeID exists
  if (employeeId && employeeId !== '') {

    this.getNotifications(); // first call immediately

    this.notificationSubscription = interval(5000000).subscribe(() => {
      this.getNotifications();
    });

  } else {
    console.log('Notification polling stopped — EmployeeID not found');
  }
}

  profile_details = {

    "EmployeeID": localStorage.getItem("EmployeeID")
  
  }
  ngOnInit() {
     // Subscribe to notifications

  
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.Status_role();
    this.loction_status = localStorage.getItem('address');
   
    if (this.loction_status == '') {
      this.location_enable = true;
    } else {
      this.location_enable = false;
    }
  }

  dataToSend: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };

  dash() {
    this.show = !this.show;
  }

  router_to_homecare() {
    this.router.navigateByUrl('ppm-vendor-status');
  }

  async openDashboardModal() {
    const modal = await this.modalCtrl.create({
      component: DashboardModalPage,
    });
    await modal.present();
  }

  Router_to_coporate() {
    this.router.navigateByUrl('dashboard');
  }

  charge() {
    this.router.navigateByUrl('charge');
  }

  user() {
    this.router.navigateByUrl('rocket');
  }
  openNotification() {
  this.isNotificationOpen = true;
  this.getNotifications();
}

closeNotification() {
  this.isNotificationOpen = false;
}


firstLoad: boolean = true;

  // ================= GET NOTIFICATIONS =================
getNotifications(): void {

  const userdetails = {
    user_id: localStorage.getItem('EmployeeID') || ''
  };

  this.http.post<any>(
    'https://techxpertindia.in/api/show_all_notification_by_user_id.php',
    userdetails
  ).subscribe({
    next: (res) => {

      this.notifications = res?.notifications || [];
      this.notification_counter = this.notifications.length;

      // 🔔 play sound ONLY if:
      // 1. not first load
      // 2. new notification arrived
      // 3. app is open
      if (
        !this.firstLoad &&
        this.notification_counter > this.lastNotificationCount &&
        document.visibilityState === 'visible'
      ) {
        this.playNotificationSound();
      }

      // update counters
      this.lastNotificationCount = this.notification_counter;
      this.firstLoad = false;
    },

    error: () => {
      this.notifications = [];
      this.notification_counter = 0;
    }
  });
}



  att() {
    this.ngxService.start();

    var url = 'https://techxpertindia.in/api/get_employee_attendance_status.php';
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);

      this.intime_status = data;
      this.intime_status = this.intime_status.InTimeStatus;

      console.log('IN_time_status', this.intime_status);

      this.outtime_status = data;
      this.outtime_status = this.outtime_status.OutTimeStatus;

      console.log('Out_time_status', this.outtime_status);

      this.emp = data;
      this.emp = this.emp;

      this.out = data;
      this.out = this.out.data.attendace_records.OutTime;

      console.log('OUT_Timing', this.convertTo12HourFormat(this.out));

      this.in = data;
      this.in = this.in.data.attendace_records.InTime;

      console.log('IN_Timing', this.convertTo12HourFormat(this.in));

      this.employname = data;
      this.employname = this.employname.EmployeeName;

      if (this.intime_status == '0') {
        this.openAttendanceAlert();
      }

      this.ngxService.stop();
    });
  }

  location() {
    localStorage.removeItem('address');
    this.chckAppGpsPermission();
  }

  async openAttendanceAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Mark your attendance',
      message: 'Please punch in to start work.',
      cssClass: 'attendance-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-btn',
        },
        {
          text: 'Punch In',
          handler: () => {
            this.router.navigateByUrl('attdenc-in');
          },
          cssClass: 'punch-btn',
        },
      ],
    });
    await alert.present();
  }

  roles() {
    const role = localStorage.getItem('role');

    if (!role) {
      console.error('No role found in localStorage');
      return;
    }

    const rolesArray = role.split(',').map(r => r.trim());
    console.log('Roles:', rolesArray);

    const corporateRoles = [
      'Branch Account Manager',
      'City Corporate Lead',
      'Account Manager',
      'HR',
      'CFO'
    ];

    // Attendance rule ONLY for Technicians
    if (rolesArray.includes('Technician')) {

      // Technician → attendance not punched → show alert
      if (this.intime_status == '0') {
          this.router.navigateByUrl('/all-ppm-tickest');
        return;
      }

      // Technician → attendance done → go to ppm tickets
      this.router.navigateByUrl('/all-ppm-tickest');
      return;
    }

    // Vendor → always go to ppm tickets (no alert)
    if (rolesArray.includes('Vendor')) {
      this.router.navigateByUrl('/all-ppm-tickest');
      return;
    }

    // Corporate roles
    if (rolesArray.some(r => corporateRoles.includes(r))) {
      this.router.navigateByUrl('/corporate-all-tickets');
      //  this.presentToast('No matching role found.');
      return;
    }

    this.presentToast('No matching role found.');
  }


 home_care_roles() {
    const role = localStorage.getItem('role');

    if (!role) {
      console.error('No role found in localStorage');
      return;
    }

    const rolesArray = role.split(',').map(r => r.trim());
    console.log('Roles:', rolesArray);

    const corporateRoles = [
      'Branch Account Manager',
      'City Corporate Lead',
      'Account Manager'
    ];

    // Attendance rule ONLY for Technicians
    if (rolesArray.includes('Technician')) {
      // Technician → attendance done → go to ppm tickets
      this.router.navigateByUrl('/home-care');
      return;
    }

    // Vendor → always go to ppm tickets (no alert)
    if (rolesArray.includes('Vendor')) {
      this.router.navigateByUrl('/home-care');
      return;
    }

    // Corporate roles
    if (rolesArray.some(r => corporateRoles.includes(r))) {
      this.router.navigateByUrl('/home');
      //  this.presentToast('No matching role found.');
      return;
    }

    this.presentToast('No matching role found.');
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'medium'
    });
    await toast.present();
  }

  router_to_attendance() {
    const inStatus = this.intime_status;
    const outStatus = this.outtime_status;

    console.log('inStatus:', inStatus);
    console.log('outStatus:', outStatus);

    if (inStatus == 1 && outStatus == 1) {
      this.router.navigateByUrl('attendance');
    } else if (inStatus == 1) {
      this.router.navigateByUrl('attdenc-out');
    } else {
      this.router.navigateByUrl('attdenc-in');
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


    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.accuracy = resp.coords.accuracy;

        localStorage.setItem('latitude', this.latitude.toString());
        localStorage.setItem('longitude', this.longitude.toString());

        console.log(this.latitude);
        console.log(this.longitude);

        this.getGeoencoder(this.latitude, this.longitude);


      })

  }

  async getGeoencoder(latitude: number, longitude: number) {


    try {
      const result: NativeGeocoderResult[] =
        await this.nativeGeocoder.reverseGeocode(
          latitude,
          longitude,
          this.geoencoderOptions
        );

      if (result && result.length > 0) {
        this.address = this.generateShortCleanAddress(result[0]);
        localStorage.setItem('address', this.address);
        console.log('Address', this.address);
      } else {
        this.address = 'Address not found';
      }


    } catch (error) {

      console.error('Error getting geocode', error);
      this.address = 'Unable to fetch address';
    }
  }

  generateShortCleanAddress(addressObj: any): string {
    const parts = [];

    if (addressObj.subThoroughfare) parts.push(addressObj.subThoroughfare);
    if (addressObj.thoroughfare) parts.push(addressObj.thoroughfare);
    if (addressObj.subLocality) parts.push(addressObj.subLocality);
    if (addressObj.locality) parts.push(addressObj.locality);

    if (addressObj.administrativeArea) {
      let state = addressObj.administrativeArea;

      const stateShortcuts = {
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

      const key = state.toLowerCase();
      state = stateShortcuts[key] || state;

      parts.push(state);
    }

    const uniqueParts = [...new Set(parts)];

    if (addressObj.postalCode) {
      return `${uniqueParts.join(', ')} - ${addressObj.postalCode}`;
    } else {
      return uniqueParts.join(', ');
    }
  }

  Status_role() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role);

      let rolesArray = role.split(',');
      console.log(rolesArray);

      if (
        rolesArray.includes('Branch Account Manager') ||
        rolesArray.includes('City Corporate Lead') ||
        rolesArray.includes('Account Manager')
      ) {
        this.status = false;
      } else if (
        rolesArray.includes('Technician') ||
        rolesArray.includes('Vendor')
      ) {
        this.status = true;
      }
    } else {
      console.error('No role found in localStorage');
    }
  }

  vendor_roles() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role);

      let rolesArray = role.split(',');
      console.log(rolesArray);

      if (rolesArray.includes('Vendor')) {
        this.vendor = false;
      } else {
        this.vendor = true;
      }
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

async logout() {

  const login = {
    UserID: localStorage.getItem('EmployeeID'),
    DeviceToken: localStorage.getItem('fcm_token')
  };

  this.http.post(
    'https://techxpertindia.in/api/logout.php',
    login
  ).subscribe({
    next: (res: any) => {
      // clear local storage after API success
      localStorage.clear();

      // redirect to login
      this.router.navigateByUrl('/login', { replaceUrl: true });
    },
    error: (err) => {
      // even if API fails, force logout
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  });

}

  convertTo12HourFormat(time: string): string {
    if (!time) return '';

    const [hourStr, minute, second] = time.split(':');
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute} ${ampm}`;
  }

  async showPopupOnce() {
    const festivalDates = ['2025-10-19', '2025-10-20'];

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    if (!festivalDates.includes(todayStr)) return;

    const currentHour = now.getHours();
    if (currentHour >= 12) return;

    this.http
      .get('https://techxpertindia.in/api/popup_api.php')
      .subscribe(async (response: any) => {
        console.log(response);
        this.bannerdata = response.popup;

        if (this.bannerdata) {
          const modal = await this.modalCtrl.create({
            component: PopupModalComponent,
            componentProps: { popupData: this.bannerdata },
            backdropDismiss: false,
          });

          await modal.present();

          this.launchConfetti();
        }
      });
  }

  launchConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        shapes: ['circle', 'square'],
        colors: ['#FFA500', '#FFD700', '#FF4500', '#FF6347'],
        scalar: 1.2,
        ticks: 250,
        gravity: 0.8,
      });

      confetti({
        particleCount: 8,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        shapes: ['circle', 'square'],
        colors: ['#FFA500', '#FFD700', '#FF4500', '#FF6347'],
        scalar: 1.2,
        ticks: 250,
        gravity: 0.8,
      });

      confetti({
        particleCount: 5,
        angle: 90,
        spread: 20,
        origin: { x: 0.5, y: 0 },
        shapes: ['circle'],
        colors: ['#FFD700', '#FFA500'],
        scalar: 1.0,
        ticks: 300,
        gravity: 0.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  
profile() {
   var url = "https://techxpertindia.in/api/get_employee_info.php";
    // console.log(this.user);
    return this.http.post(url, this.profile_details, { headers: new HttpHeaders({ "content-Type": "application/json" }) })
      .subscribe(data => {
        // console.log(data);
        this.obj = data;
        this.obj = this.obj.data;
        // console.log(this.obj);
      });
}




  // ==============================
  // OPEN ACTION SHEET
  // ==============================
  async captureImage() {
    const hasPermission = await this.checkCameraPermission();

    if (!hasPermission) {
      console.warn('Camera permission denied');
      return;
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.takePicture1(CameraSource.Camera),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  // ==============================
  // TAKE / PICK IMAGE
  // ==============================
  async takePicture1(source: CameraSource) {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: source,
        allowEditing: false,
      });

      const base64Image = photo.base64String;

      if (base64Image) {
        this.clickedImage = 'data:image/jpeg;base64,' + base64Image;
        this.saveImageToDataStore(base64Image);
      }

    } catch (err) {
      console.error('Camera error:', err);
    }
  }

  // ==============================
  // UPLOAD IMAGE TO SERVER
  // ==============================
  saveImageToDataStore(imageData: string) {
    this.ngxService.start();

    this.edit_profile.imageData = imageData;

    const url = 'https://techxpertindia.in/api/update_employee_profile_image.php';

    this.http.post(url, this.edit_profile).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
        this.profile();
      },
      error: (err) => {
        console.error('Upload error:', err);
      },
      complete: () => {
        this.ngxService.stop();
      },
    });
  }

  // ==============================
  // CHECK CAMERA PERMISSION
  // ==============================
  async checkCameraPermission(): Promise<boolean> {
    const result = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.CAMERA
    );

    if (!result.hasPermission) {
      const request = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.CAMERA
      );

      return request.hasPermission;
    }

    return true;
  }

  // ==============================
  // REFRESH PROFILE (YOUR API)
  // ==============================
// soundLoaded = false;
//   async showInAppMessage() {

//     // 🔊 preload only once
//     if (!this.soundLoaded) {
//       await this.nativeAudio.preloadSimple(
//         'notif',
//         'assets/sounds/notification.mp3'
//       );
//       this.soundLoaded = true;
//     }

//     // 🔔 play every time
//     this.nativeAudio.play('notif');

//     // 📢 show alert
//     const alert = await this.alertCtrl.create({
//       header: 'Notification',
//       message: 'This message appears with sound every time',
//       buttons: ['OK']
//     });

//     await alert.present();
//   }





playNotificationSound() {
  this.nativeAudio.play('notif');
}

soundLoaded = false;
async preloadSound() {
  if (!this.soundLoaded) {
    await this.nativeAudio.preloadSimple(
      'notif',
      'assets/sounds/notification.mp3'
    );
    this.soundLoaded = true;
  }
}



SeenNotification(notification_id: string, index: number) {
  console.log('Deleting notification with ID:', notification_id);
  const notifiction_user = {
    notification_id: notification_id,
    user_id: localStorage.getItem('EmployeeID')
  };

  this.http.post(
    'https://techxpertindia.in/api/mark_notification_seen.php',
    notifiction_user
  ).subscribe({
    next: (res: any) => {

      if (res?.status === true || res?.success === true) {
        // remove from UI
        this.notifications.splice(index, 1);
        this.notification_counter = this.notifications.length;
      }

    },
    error: () => {
      this.showToast('Failed to delete notification', 'danger');
    }
  });

}




deleteNotification() {

var url = "https://techxpertindia.in/api/clear_all_notifications.php";
    const notifiction_user = {
      user_id: localStorage.getItem('EmployeeID')
    };
    return this.http.post(url, notifiction_user).subscribe((data) => {
      console.log(data);
      this.temp = data;
      this.temp = this.temp.message;
      console.log(this.temp);
      if (this.temp == "All notifications cleared successfully") {
        this.showToast('All notifications cleared successfully', 'success');
        this.notifications = [];
        this.notification_counter = 0;
      } else {
        this.showToast('Failed to clear notifications', 'danger');
      }
    });

    

}


}




