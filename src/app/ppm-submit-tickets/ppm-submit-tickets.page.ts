import { Component, OnInit } from "@angular/core";
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CalendarComponentOptions } from 'ion2-calendar'
// import { Camera ,CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-ppm-submit-tickets',
  templateUrl: './ppm-submit-tickets.page.html',
  styleUrls: ['./ppm-submit-tickets.page.scss'],
})
export class PpmSubmitTicketsPage implements OnInit {
  showForm: boolean
  calculationForm: FormGroup
  calculation: FormGroup;
  costly = true

  Techxpert_cost: any;

  final_otp: any;
  button :boolean
  OTP :any = {
    "TicketID": localStorage.getItem("ID")
  }
  befor = false
  vendo: boolean
  rocke: any = "None"

  valid_cost: any;
  booking: any = 'books';
  secoundimg_post: string;
  open4_post = false
  threeimg_post: string;
  Quotation: string = 'No';
  raise = true
  set: boolean = false;
  secoundimg: string;
  open4 = false
  threeimg: string;
  dateMulti: string[];
  type: 'string';
  checkbox: boolean = false;
  close_tickets: any;
  teemp = false

  spare = {
    "TicketID": localStorage.getItem("ID"),
      "Action": "PPM_Ticket",
    "SparePartDecs": ""
  }

   edit_data = {
    "TicketID": localStorage.getItem("ID"),
    "Action": "PPM_Ticket",
    "CallType": "",
  }

  cost = {
    "TicketID": localStorage.getItem("ID"),
    "Action": "PPM_Ticket",
  }

  ppm_data = {
    "TicketID": localStorage.getItem("ID"),
    "Type":"ppm_tickets"
  }
  dataToSend = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "pre_img",
    "Type":"ppm_tickets"

  }
  dataToSendd ={
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "Service_Report",
     "Type":"ppm_tickets"
  }
  dataTo_post = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "post_img",
     "Type":"ppm_tickets",

  }
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  img2_post = true

  open2_post = false
  open3_post = false
  ist_post = false
  add2_post = false
  three_post = false
  add_post = false
  img_post = true
  assgin: boolean
  isButtonDisabled: boolean = false;
  isButtonDisable: boolean = false
  toast: any;
  temp: any;

  bookingdata = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
      "Action": "PPM_Ticket",
    DueDate: localStorage.getItem("Date"),

    // Quotation: ""
    // "CallType":"Custumprice",
    // "ExpnsePrice":"Description",

  };
  isButtonDisabled_to: boolean = false;
  isButtonDis: boolean = false
  img2 = true
  Assgin_status = false
  open2 = false
  open3 = false
  ist = false
  add2 = false
  add22 = false
  three = false
  add = false

  img = true
  searchTerm: string;
  message: any;
  status_services: string = "otp"
  emp: any;

  vendor_ = {
    TicketID: localStorage.getItem("ID"),
    EmployeeType: "Vendor"
  };
  Tech = {
    TicketID: localStorage.getItem("ID"),
    EmployeeType: "Technician"
  }
  final_otp_price: any;
  services_data: any;
  clickedImage: string;
  clickedd: string
  clickedImage_post: string;
  closer: boolean;
  clicked: string;
  use: any;
  otp: any;
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;
  photo2: string
  test_variable: any;
  ID: any;

  dataToSends = {
    TicketID: localStorage.getItem("ID"),
  }
  rol: any
  pick: Boolean = false;
  photo: string
  role: any
  close = false
  open = false
  BookingID: any;
  mic: any;
  value: any;
  user: any
  impact: any = {};
  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
  deo: any;
  serve: any;
  order: any;
  image: any;
  status: Boolean = false;
  hidden: Boolean = true;
  wwe: Boolean = false;
  sign: Boolean = false;
  show = false
  Type: any;
  selectedValue: any;
  assginvalue: any;
  edit_value: any
  close_icon: boolean
  predata: any;
  isButtonDisabled11: boolean;
  isButtonDisabled22: boolean;
  isButtonDisabled33: boolean;
  hidd: boolean
  otr: boolean = true;
  grow: boolean = true
  imageUrl: string;
  isButtonDisabled34: boolean;
  post_img: any;
  pre_img: any;
  post_not_done: boolean;
  post_done: boolean;
  pre_not_done: boolean;
  pre_done: boolean;
  services: string;
  services_reports: any;
  services_not_done: boolean;
  services_done: boolean;

  general_services: any;
  imgg: any;
  report_category: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
  
    private ngxService: NgxUiLoaderService,
    private androidPermissions: AndroidPermissions,
    public toastController: ToastController,
    public router: Router,
    private actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
    this.checkCameraPermission()
    this.spare.SparePartDecs = "No"
    this.edit_data.CallType = "OTR"
    this.emp = localStorage.getItem("empl_ID")
    console.log(this.emp)
    this.detailsview();


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
  ngOnInit() {
    this.bookingdata.AssignedTo = "Assigned"
    // if(this.bookingdata.TicketStatus == undefined  || this.bookingdata.TicketStatus == "") this.bookingdata.TicketStatus = "Raise";
    this.rol = localStorage.getItem("ASSto")
    console.log(this.rol)
    this.role = localStorage.getItem("role")
    console.log(this.role)
    if (this.role == "Vendor" || this.role == "Technician") {
      this.close = false
      this.raise = false
      this.hidden = true
    } else {
      this.close = true
      this.raise = true
      this.hidden = false
    }

    if (this.role == "Vendor" || this.role == "Technician") {
      this.open = true

    }
    else {
      this.open = false
    }
    if (this.role == "Vendor" || this.role == "Technician") {
      this.wwe = false

    }
    else {
      this.wwe = true
    }
    if (this.role == "Vendor" || this.role == "Technician") {
      this.closer = true
      this.grow = false

    }
    else {
      this.closer = false
      this.grow = true
    }

  }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.ppm_data.TicketID = params.BookingID;

        this.BookingID = params.BookingID
        console.log(this.BookingID)

        this.predata = 0
      }

      this.Getdata();
  


    })
  }
  Getdata() {
    this.ngxService.start()
    // var url = "https://techxpertindia.in/api/get_ppm_ticket_detail.php";
    var url = "https://techxpertindia.in/api/get_corporate_ticket_detail.php"
    return this.http
      .post(url, this.ppm_data, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.post_img = response
         this.post_img = this.post_img.data.PostImg
        //  alert(this.post_img)
         if(this.post_img == 0){
          this.post_not_done = true;
          this.post_done = false;
         }else{
          this.post_not_done = false
          this.post_done = true;
         }
        this.pre_img = response
        this.pre_img= this.pre_img.data.PreImg
        // alert(this.pre_img)
        if(this.pre_img == 0){
         this.pre_not_done = true;
         this.pre_done = false;
        }else{
         this.pre_not_done= false
         this.pre_done = true;
        }
        this.services_reports = response
        this.services_reports = this.services_reports.data.GeneralServiceReport
       if(this.services_reports == 0 ){
       this.services_not_done = true;
       this.services_done = false
       }else{
       this.services_not_done = false;
       this.services_done = true;
}      this.general_services = response 
        this.general_services = this.general_services.data.GeneralServiceReportID
          console.log(this.general_services)
         this.general_services = localStorage.setItem("Genral_services_report" , this.general_services)
        // alert(this.services_reports)
        this.ID = response
        // console.log(this.ID)
        // this.ID = this.ID.data.ID
        // this.ID = localStorage.setItem("ID", this.ID)
        // this.ID = localStorage.getItem("ID")
        // alert(this.ID)
        this.rol = response
        this.rol = this.rol.data.AssignedTo
        this.bookingdata.AssignedTo = this.rol
        this.order = response;
        this.order = this.order.data.EmployeeName
        console.log(this.order)
        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact);
        this.temp = response
        this.temp = this.temp.data.length
        console.log(this.temp)
        if (this.temp == "0") {
          this.show = true
        } else {
          this.show = false
        }
        this.Type = response;
        this.Type = this.Type.data.Type
        console.log(this.Type)
        if (this.Type == "AMC") {
          this.teemp = true
        } else {
          this.teemp = false
        }
        this.imgg = response
        this.imgg = this.imgg.data.ticket_images
        console.log(this.img)
     
        if(this.pre_img == 0 || this.post_img == 0 || this.general_services == 0){
          this.button = false;
        }else{
          this.button = true;
        }
        this.ngxService.stop();

        // this.report_category = response;
        // this.report_category = this.report_category.data.CategoryName
        // console.log( "report :",this.report_category)
      });
  }

  onSelectChange(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
    if (this.selectedValue == "None") {
      this.Assgin_status = true
      this.raise = false

    }
  }


  SelectChange(event: any) {
    this.assginvalue = event.detail.value;
    console.log(this.assginvalue)
    if (this.assginvalue == this.emp) {
      this.set = false
      this.raise = true

    } else {
      this.bookingdata.TicketStatus = "Assigned"
      this.set = true
      this.raise = false

    }
  }

  onSelect_Tech(event: any) {
    this.assginvalue = event.detail.value;
    console.log(this.assginvalue)
    if (this.assginvalue == this.emp) {
      this.set = false
      this.raise = true

    } else {
      this.bookingdata.TicketStatus = "Assigned"
      this.set = true
      this.raise = false

    }
  }


  row = true



async captureImage() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.takePicture1(CameraSource.Camera),
      },
      {
        text: 'Choose from Gallery',
        icon: 'image',
        handler: () => this.takePicture1(CameraSource.Photos),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });
  await actionSheet.present();
}

async takePicture1(source: CameraSource) {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source,
    });

    const cleanBase64 = photo.base64String;
    this.saveImageToDataStore(cleanBase64);
    this.clickedImage = 'data:image/jpeg;base64,' + cleanBase64;
  } catch (err) {
    console.log('Camera error:', err);
  }
}

saveImageToDataStore(imageData: string) {
  this.ngxService.start();
  this.dataToSend.imageData = imageData;
  const postData = { data: this.dataToSend };
  const url = "https://techxpertindia.in/api/get_capture_image.php";

  this.http.post(url, postData).subscribe({
    next: (data: any) => {
      this.Get();
      console.log(data);
    },
    error: (error) => console.error('Error saving image:', error),
    complete: () => this.ngxService.stop(),
  });
}

async capture() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.takePicture2(CameraSource.Camera),
      },
      {
        text: 'Choose from Gallery',
        icon: 'image',
        handler: () => this.takePicture2(CameraSource.Photos),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });
  await actionSheet.present();
}

async takePicture2(source: CameraSource) {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source,
    });

    const cleanBase64 = photo.base64String;
    this.saveImageToData(cleanBase64);
    this.clicked = 'data:image/jpeg;base64,' + cleanBase64;
  } catch (err) {
    console.log('Camera error:', err);
  }
}

saveImageToData(imageData: string) {
  this.ngxService.start();
  this.dataToSend.imageData = imageData;
  const postData = { data: this.dataToSend };
  const url = "https://techxpertindia.in/api/get_capture_image.php";

  this.http.post(url, postData).subscribe({
    next: (data: any) => {
      this.Get();
      // this.isButtonDisabled22 = true;
      // this.add2 = true;
      console.log(data);
    },
    error: (error) => console.error('Error saving image:', error),
    complete: () => this.ngxService.stop(),
  });
}



async Image_post() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.takePicture_post(CameraSource.Camera),
      },
      {
        text: 'Choose from Gallery',
        icon: 'image',
        handler: () => this.takePicture_post(CameraSource.Photos),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });

  await actionSheet.present();
}

async takePicture_post(source: CameraSource) {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source,
    });

    const cleanBase64 = photo.base64String;

    // Save to API
    this.saveImag(cleanBase64);

    // Preview
    this.threeimg_post = 'data:image/jpeg;base64,' + cleanBase64;

  } catch (err) {
    console.log("Camera error:", err);
  }
}


saveImag(imageData: string) {
  this.ngxService.start();
  this.dataTo_post.imageData = imageData;

  const postData = {
    data: this.dataTo_post,
  };

  const url = "https://techxpertindia.in/api/get_capture_image.php";

  return this.http.post(url, postData).subscribe((data) => {
    this.Get();
    this.isButtonDis = true;
    console.log(data);

    (error) => {
      console.error('Error saving image:', error);
    };

    this.ngxService.stop();
  });
}



















  click_to_next() {
    this.open3 = true
    this.add = false

  }


  click_to_next2() {
    this.open4 = true
    this.add2 = false

  }



  click_to_next_post() {
    this.open3_post = true
    this.add_post = false

  }


  click_to_next2_post() {
    this.open4_post = true
    this.add2_post = false

  }







  onSelect(event: any) {
    this.edit_value = event.detail.value;
    console.log(this.edit_value)
    if (this.edit_value == "Yes" && this.Type == "AMC") {
      var url = "https://techxpertindia.in/api/add_spare_item_status.php";
      return this.http.post(url, this.spare).subscribe((data) => {

        console.log(data);
        this.users = data;
        this.obj = this.users;

        console.log(this.obj);
        this.hidd = true

        this.grow = false
      })

    }
    if (this.edit_value == "No") {

      this.hidd = false
      this.grow = true
    }
    // if (this. edit_value == "Yes") {
    //   this.status = false

    // } else {
    // //   this.status = true
    // }


  }



  onassgin(event: any) {
    this.edit_value = event.detail.value;
    console.log(this.edit_value)

    if (this.edit_value == "emp") {

      this.assgin = true
      this.vendo = false
    } else if (this.edit_value == "Tech") {

      this.vendo = true
      this.assgin = false


    }

    // if (this. edit_value == "Yes") {
    //   this.status = false

    // } else {
    // //   this.status = true
    // }


  }



  // onSelect_Tech(event: any) {
  //   this.edit_value = event.detail.value;
  //   console.log(this.edit_value)

  //   if (this.edit_value == "Tech") {

  //     // this.assgin = true
  //     this.vendo = true 

  //   }
  //   // if (this. edit_value == "Yes") {
  //   //   this.status = false

  //   // } else {
  //   // //   this.status = true
  //   // }


  // }





  // super() {
  //   this.ngxService.start();
  //   {
  //     this.toast = this.toastController
  //       .create({
  //         message: "Thanku For Submit",
  //         duration: 2000,
  //       })
  //       .then((toastData) => {
  //         console.log(toastData);
  //         toastData.present();
  //         this.ngxService.stop();
  //       });

  //   }
  //   this.ngxService.start();
  //   var url = "https://techxpertindia.in/api/add_ticket_finance_details.php";
  //   return this.http.post(url, this.edit_data).subscribe((data) => {
  //     console.log(data);
  //     this.users = data;
  //     this.obj = this.users;

  //     console.log(this.obj);
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         BookingID: this.BookingID
  //       }
  //     }
  //     this.hidd = false;
  //     this.grow = true
  //     this.ngxService.stop();
  //   });

  // }


  route_to_profile_answer_screen(BookingID) {

    if (window) {

      if (
        this.dataToSend.Action == ""
      ) {

        this.toast = this.toastController
          .create({
            message: "Image Not Capture ",
            duration: 2000,
          })
          .then((toastData) => {
            console.log(toastData);
            toastData.present();
          });
      } else {

        this.BookingID = BookingID;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            BookingID: this.BookingID

          }

        }
        // if (this.role == "Vendor" || this.role == "Technician") {
        //   this.router.navigate(['verfication-otp'], navigationExtras);

        // } else {
        // //  this.tea = false;
        // //   this.hide = true;

        this.router.navigate(['submit'], navigationExtras);
      }
    }
  }




async services_report() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.takePicture(CameraSource.Camera),
      },
      {
        text: 'Choose from Gallery',
        icon: 'image',
        handler: () => this.takePicture(CameraSource.Photos),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });
  await actionSheet.present();
}

async takePicture(source: CameraSource) {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source,
    });

    const cleanBase64 = photo.base64String;

    // Save raw base64 to API
    this.saveImage_services(cleanBase64);

    // Keep prefixed version for preview
    this.services = 'data:image/jpeg;base64,' + cleanBase64;
  } catch (err) {
    console.log('Camera error:', err);
  }
}

saveImage_services(imageData: string) {
  this.ngxService.start();
  this.dataToSendd.imageData = imageData;
  const postData = { data: this.dataToSendd };
  const url = "https://techxpertindia.in/api/get_capture_image.php";

  this.http.post(url, postData).subscribe({
    next: (data: any) => {
      this.isButtonDisabled11 = true;
      this.add = true;
      this.Get();
      console.log(data);
    },
    error: (error) => console.error('Error saving image:', error),
    complete: () => this.ngxService.stop(),
  });
}



 async Service_Change_Status() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'circles'
    });
    await loading.present();

    const url = "https://techxpertindia.in/api/close_ppm_ticket.php";
    // const url = "https://techxpertindia.in/api/generate_otp_for_closure.php";

    this.http.post(url, this.OTP).subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.obj = this.users;

        console.log(this.obj);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            BookingID: this.BookingID
          }
        };
        this.router.navigate(["ppm-view-details"], navigationExtras);
        loading.dismiss();
      },
      error: (err) => {
        console.error(err);
        loading.dismiss();
      }
    });
  }

  

report() {
  const reportCategory = localStorage.getItem("report_category"); // ✅ Get from localStorage

  if (reportCategory === "HVAC") {
    this.router.navigateByUrl("/new-havc");
  } 
  else if (reportCategory === "CCTV") {
    this.router.navigateByUrl("/cctv");
  } 
  else if (reportCategory === "Electrical"){
    this.router.navigateByUrl("/panels");
  }
  else if (reportCategory == "UPS"){
        this.router.navigateByUrl("/ups");
  }
  else if (reportCategory == "Fire Safety"){
        this.router.navigateByUrl("/fire-check-list");
  }

  else {
    this.router.navigateByUrl("/ppm-services-report");
  }
}



deleteImage(ID: string, index: number) {

  const data = {
    TicketID: localStorage.getItem('ID'),
    ImageID: ID
  };

  this.http
    .post('https://techxpertindia.in/api/delete_p_p_m_ticket_image.php', data)
    .subscribe(
      (res: any) => {

        if (res?.error === "False") {

          // remove image from UI
          this.imgg.splice(index, 1);

          // optional refresh
          this.Getdata();

        } else {
          console.log('Delete failed:', res);
        }
            this.Get()
      },
      (error) => {
        console.log('API error:', error);
      }
    );
}


}


































































