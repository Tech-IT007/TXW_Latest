import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  PreloadAllModules,
  Router,
} from '@angular/router';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-visitor-booking',
  templateUrl: './visitor-booking.page.html',
  styleUrls: ['./visitor-booking.page.scss'],
})
export class VisitorBookingPage implements OnInit {

  add_img:boolean = true
  row = false
  row1 = false
  view = false
  Service: any;
  temp_id: any;
  isButtonDisabled: boolean;
  isButtonDisabled1: boolean;
  isButtonDisabled2: boolean;
  isButtonDisabled3: boolean;
  add: boolean
  clickedImage :string;
  disabled: any
  message: any;

  Corporat_service: any;
  Corporate_sub_service: any
  cop_service: any;
 
  toast: any;  
  testvar: any;
  userId: any;
 
  data = {
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "ObservationID": -1,
    "TempObservationID": -1,
    "CreatedBy": localStorage.getItem("workname"),
    "imageData": ""
  }

  data2 = {
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "ObservationID": -1,
    "TempObservationID":"",
    "CreatedBy": localStorage.getItem("workname"),
    "imageData": ""
  }

  userdetails: any = {
    "CreatedBy": localStorage.getItem("workname"),
    "SiteVisitID": localStorage.getItem("SiteVisitID"),
    "Category":"",
    "Priority":"Non Critical",
    "Observation":"",
    "CompanyRecommendation":"",
    "ClientRecommendation":"",
    "TempObservationID":localStorage.getItem("temp_ID")
  }

  clicked: string;
  clicked1: string;
  clicked2: string;
  sec: boolean;
  sec1: boolean;
  sec2: boolean;
  id: any;

  users: any;
  dataToSend:any = { category_name: "" }
  user: any;
  temp: any;

  constructor(
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public api: ApiService,
    public toastController: ToastController,
  
    public router: Router,
    public loadingCtrl: LoadingController
  ) { 
    this.userdetails.Priority = "Non Critical"
  }

  ngOnInit() {
    this.temp = localStorage.getItem("SiteVisitID")
    this.data.SiteVisitID = this.temp
    this.allservice()
  }

  allservice() {
    var url = "https://techxpertindia.in/api/get_all_categories.php";
    return this.http.get(url).subscribe((data) => {
      this.users = data;
      this.users = this.users.data;
    });
  }

  onSelectChange(event: any) {
    this.userdetails.Category = event.detail.value;
  }

  submit() {
    this.ngxService.start();
    if (this.userdetails.Category == "") {

      this.toast = this.toastController
        .create({
          message: "Enter Your Message",
          duration: 2000,
        })
        .then((toastData) => {
          toastData.present();
        });
      this.ngxService.stop();
    }

    else {
      this.ngxService.start();

      var url = "https://techxpertindia.in/api/site_visits/submit_site_observation.php";

      return this.http
        .post(url, this.userdetails, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((response) => {
          this.router.navigateByUrl("/visitor-all-tickets") 
          this.ngxService.stop();
        });
    }
  }


async captureImage() {
  try {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    const base64Data = image.base64String;
    if (!base64Data) return;

    this.clickedImage = 'data:image/jpeg;base64,' + base64Data;
    this.saveImageToDataStore(base64Data);
  } catch (err) {
    console.log(err);
  }
}

async capture() {
  try {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    const base64Data = image.base64String;
    if (!base64Data) return;

    this.clicked = 'data:image/jpeg;base64,' + base64Data;
    this.saveImageToData(base64Data);
  } catch (err) {
    console.log(err);
  }
}

async capture1() {
  try {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    const base64Data = image.base64String;
    if (!base64Data) return;

    this.clicked1 = 'data:image/jpeg;base64,' + base64Data;
    this.saveImage(base64Data);
  } catch (err) {
    console.log(err);
  }
}

async capture2() {
  try {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    const base64Data = image.base64String;
    if (!base64Data) return;

    this.clicked2 = 'data:image/jpeg;base64,' + base64Data;
    this.save(base64Data);
  } catch (err) {
    console.log(err);
  }
}

// -------------------- Save Image Methods --------------------

saveImageToDataStore(imageData: string) {
  this.ngxService.start();
  this.data.imageData = imageData; // pure base64

  const postData = { data: this.data };
  const url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php";

  this.http.post(url, postData).subscribe((response: any) => {
    this.id = response.TempObservationID;

    this.data.SiteVisitID = localStorage.getItem("SiteVisitID");
    this.userdetails.TempObservationID = this.id;
    this.data2.TempObservationID = this.id;

    this.row = true;
    this.isButtonDisabled = true;
    this.add = true;

    this.ngxService.stop();
  });
}

saveImageToData(imageData: string) {
  this.ngxService.start();
  this.data2.imageData = imageData;

  const postData = { data: this.data2 };
  const url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php";

  this.http.post(url, postData).subscribe(() => {
    this.isButtonDisabled1 = true;
    this.ngxService.stop();
  });
}

saveImage(imageData: string) {
  this.ngxService.start();
  this.data2.imageData = imageData;

  const postData = { data: this.data2 };
  const url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php";

  this.http.post(url, postData).subscribe(() => {
    this.view = true;
    this.isButtonDisabled2 = true;
    this.ngxService.stop();
  });
}

save(imageData: string) {
  this.ngxService.start();
  this.data2.imageData = imageData;

  const postData = { data: this.data2 };
  const url = "https://techxpertindia.in/api/site_visits/capture_site_observation_media.php";

  this.http.post(url, postData).subscribe(() => {
    this.isButtonDisabled3 = true;
    this.ngxService.stop();
  });
}

  
  click_to_next(){
    this.add = false
    this.sec = true
  }

  click_to_next1(){
    this.row = false
    this.sec1 = true
  }

  click_to_next2(){
    this.view = false
    this.sec2 = true
  }
}
