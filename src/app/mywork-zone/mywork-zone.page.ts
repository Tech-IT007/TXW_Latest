
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Storage } from '@ionic/storage-angular';

import { ModalController } from '@ionic/angular';
import { DashboardModalPage } from '../dashboard-modal/dashboard-modal.page';
declare let window: any;
let cordova: any;
@Component({
  selector: 'app-mywork-zone',
  templateUrl: './mywork-zone.page.html',
  styleUrls: ['./mywork-zone.page.scss'],
})
export class MyworkZonePage implements OnInit {
  out: any;
  showAttendancePopup = false;
  in: any;
  role: any;
  status: boolean;
  vendor: boolean;
  employname: any;
  emp: any={}
  intime_status: any;
  outtime_status: any;
  employee_id: any;
  Designation: any;

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
              private alertCtrl: AlertController,
              private modalCtrl: ModalController
              

  ) {}
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
  set: any;
  service_id: any;
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
    this. runHttp()
    this.att()
  }
  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
     this. Status_role()
  }
user_details = {
EmployeeID: localStorage.getItem('EmployeeID'),
}
  dataToSend: any = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };
  dash() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
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

  // att(){
  //   this.router.navigateByUrl("attdenc-in")
  // }

  charge() {
    this.router.navigateByUrl('charge');
  }

  user() {
    this.router.navigateByUrl('rocket');
  }
  att() {
    this.ngxService.start();

    var url =
      'https://techxpertindia.in/api/get_employee_attendance_status.php';
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);

      this.intime_status = data 
      this.intime_status = this.intime_status.InTimeStatus
      console.log("IN_time_status",this.intime_status)
      this.outtime_status = data
      this.outtime_status = this.outtime_status.OutTimeStatus
      console.log("Out_time_status",this.outtime_status)  
     this.emp = data
     this.emp = this.emp
      this.out = data
      this.out = this.out.data.attendace_records.OutTime;
      
      // console.log("OUT_Timing", this.convertTo12HourFormat (this.out));
      this.in = data;
      this.in = this.in.data.attendace_records.InTime
    // console.log("IN_Timing", this.convertTo12HourFormat(this.in));
        this.employname  = data 
        this.employname = this.employname.EmployeeName
    if (this.intime_status == "0") {
         this.openAttendanceAlert()// trigger popup
      }
      this.ngxService.stop();
    });
  }



 async openAttendanceAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Mark your attendance',
    message: 'Please punch in to start work.',
    cssClass: 'attendance-alert',   // 👈 add custom class
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancel-btn'     // 👈 button-specific class
      },
      {
        text: 'Punch In',
        handler: () => {
          this.router.navigateByUrl('attdenc-in');
        },
        cssClass: 'punch-btn'      // 👈 button-specific class
      }
    ],
  });
  await alert.present();
}


  roles() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if (
        rolesArray.includes('Branch Account Manager') ||
        rolesArray.includes('City Corporate Lead') ||
        rolesArray.includes('Account Manager')
      ) {
        console.log('hello');
        this.router.navigateByUrl('/corporate-all-tickets');

        // Check if either 'Technician' or 'Vendor' is in rolesArray
      } else if (
        rolesArray.includes('Technician') ||
        rolesArray.includes('Vendor')
      ) {
        // this.router.navigateByUrl('/corprate-tickets');
        this.router.navigateByUrl('/all-ppm-tickest');
      }
    } else {
      console.error('No role found in localStorage');
    }
  }

  router_to_attendance() {
    const inStatus = this.intime_status;
    const outStatus = this.outtime_status;
  
    console.log("inStatus:", inStatus);
    console.log("outStatus:", outStatus);
  
    if (inStatus == 1 && outStatus == 1) {  // Loose comparison
      console.log("Navigating to attendance_page");
      this.router.navigateByUrl('attendance');
    } 
    else if (inStatus == 1) {  // Loose comparison
      console.log("Navigating to attdenc-out");
      this.router.navigateByUrl('attdenc-out');
    } 
    else {
      console.log("Navigating to attdenc-in");
      this.router.navigateByUrl('attdenc-in');
    }
  }
  
  checkPermissions() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    result => {
      if (!result.hasPermission) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      }
    },
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  );
}



  Status_role() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if (
        rolesArray.includes('Branch Account Manager') ||
        rolesArray.includes('City Corporate Lead') ||
        rolesArray.includes('Account Manager')
      ) {
        console.log('hello');
         this.status = false;

        // Check if either 'Technician' or 'Vendor' is in rolesArray
      } else if (
        rolesArray.includes('Technician') ||
        rolesArray.includes('Vendor')
      ) {
        // this.router.navigateByUrl('/corprate-tickets');
         this.status = true
      }
    } else {
      console.error('No role found in localStorage');
    }
  }
 
  vendor_roles() {
    const role = localStorage.getItem('role');

    if (role) {
      console.log(role); // Log the role for debugging

      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);

      // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
      if ( rolesArray.includes('Vendor')) {
        console.log('hello');
         this.vendor = false;
      }else {
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


  runHttp() {
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/get_employee_info.php";
    // console.log(this.user);
    return this.http.post(url, this.user_details, { headers: new HttpHeaders({ "content-Type": "application/json" }) })
      .subscribe(data => {
       console.log(data)
       this.Designation =  data
       this.Designation = this.Designation.data.Designation
       console.log(this.Designation)
       localStorage.setItem("Designation",this.Designation)
      });
    }, 100);
  }

}

















