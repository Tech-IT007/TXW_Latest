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
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-ppm-assgine-status',
  templateUrl: './ppm-assgine-status.page.html',
  styleUrls: ['./ppm-assgine-status.page.scss'],
})
export class PpmAssgineStatusPage implements OnInit {
  showForm: boolean
  calculationForm: FormGroup
  calculation: FormGroup;
  costly = true

  Techxpert_cost: any;

  final_otp: any;


  befor = false
  vendo: boolean
  rocke: any = "None"
  // options: CameraOptions = {
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
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
    "SparePartDecs": ""
  }

  edit_data = {
    "TicketID": localStorage.getItem("ID"),
    "CallType": "",
  }

  cost = {
    "TicketID": localStorage.getItem("ID"),
  }

  dataToSend = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "pre_img"

  }
  dataTo_post = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "post_img"

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
  DataToSend = {
    "TicketID": localStorage.getItem("ID"),

    "C_VisitorNo": "",
    "C_VisitCharge": "",
    "C_MaterialCost": "",
    "C_LabourCost": "",
    "C_TotalPrice": "",
    "T_VisitorNo": "",
    "T_VisitCharge": "",
    "T_MaterialCost": "",
    "T_LabourCost": "",
    "T_TotalPrice": "",
    "Status": "1"
  }
  bookingdata = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
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
    EmployeeType: "Vendor",
     "Type":"ppm_tickets"
  };
  Tech = {
    TicketID: localStorage.getItem("ID"),
    EmployeeType: "Technician",
     "Type":"ppm_tickets"

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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private camera: Camera,
    private ngxService: NgxUiLoaderService,
    private androidPermissions: AndroidPermissions,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.checkPermissions();
    this.advance_cost()
    this.spare.SparePartDecs = "No"
    this.edit_data.CallType = "OTR"
    this.emp = localStorage.getItem("empl_ID")
    console.log(this.emp)
    this.detailsview();
    this.calculationForm = this.formBuilder.group({
      number1: [''],
      number2: [''],
      number3: [''],
      number4: [''],
      number5: [''],
      // Add more form controls as needed
    });

    this.calculationForm.valueChanges.subscribe(() => {
      if (this.calculationForm.valid) {
        this.calculateResult();
      }

    });

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
    this.calculation = this.formBuilder.group({
      number11: [''],
      number12: [''],
      number13: [''],
      number14: [''],
      number15: [''],
      // Add more form controls as needed
    });

    this.calculation.valueChanges.subscribe(() => {
      if (this.calculation.valid) {
        this.calculate();
      }

    });















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

  ngOnInit() {


    this.advance_cost()

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
        this.dataToSends.TicketID = params.BookingID;

        this.BookingID = params.BookingID
        console.log(this.BookingID)

        this.predata = 0
      }

      this.Getdata();
      this.Service_status()


    })
  }
  Getdata() {


    this.ngxService.start()



    var url = "https://techxpertindia.in/api/get_ppm_ticket_detail.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response
        console.log(this.ID)
        this.ID = this.ID.data.ID
        this.ID = localStorage.setItem("ID", this.ID)
        this.ID = localStorage.getItem("ID")
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
        this.ngxService.stop();
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
  vendor() {

    var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";
    return this.http.post(url, this.vendor_).subscribe((data) => {
      console.log(data);
      this.mic = data;
      this.mic = this.mic.data
      console.log(this.mic)
    });
  }
  Techech() {

    var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";
    return this.http.post(url, this.Tech).subscribe((data) => {
      console.log(data);
      this.value = data;
      this.value = this.value.data
      console.log(this.value)
    });
  }
  Service_status() {
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

      var url = "https://techxpertindia.in/api/get_corporate_ticket_status_v2.php";
      return this.http.post(url, this.status_services).subscribe((data) => {
        console.log(data);
        this.use = data;
        this.otp = this.use
        console.log(this.obj)
        this.serve = data
        console.log(this.serve)

        // this.close_tickets = data 
        //  this.close_tickets = this.close_tickets[6].Status
        //  console.log(this.close_tickets)
        //  if(this.close_tickets == "Closed"){
        //      this.wwe = true

        //  }else{
        // this.wwe = true
        //  }
      });
    }, 100);
  }


  row = true



  Service_Change_Status() {
    if (window) {

      if (this.bookingdata.AssignedTo == "" ||
        this.bookingdata.DueDate == ""
        // this.dataTo_post.imageData  == ""

      ) {

        this.toast = this.toastController
          .create({
            message: "Empty Fields",
            duration: 2000,
          })
          .then((toastData) => {
            console.log(toastData);
            toastData.present();
          });
      } else {



        this.ngxService.start();
        var url = "https://techxpertindia.in/api/change_ppm_ticket_status.php";
        return this.http.post(url, this.bookingdata).subscribe((data) => {
          console.log(data);
          this.users = data;
          this.obj = this.users;

          console.log(this.obj);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              BookingID: this.BookingID
            }
          }
          this.router.navigate(["ppm-tickets"], navigationExtras)
          this.ngxService.stop();
        });
      }
    }


  }


  //   proceed_to_english_action(){

  //     this.route.queryParams.subscribe(params => {
  //       this.userId = params.special;
  //     })

  //     let navigationExtras: NavigationExtras = {
  //      queryParams: {
  //        userId: this.userId
  //       }
  //      }
  //      this.router.navigate(['corprate-city-lead'], navigationExtras);
  //  }

  // route_to_profile_answer_screen(userID) {
  //   this.BookingID = userID;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID
  //     }
  //   }
  //   this.router.navigate(['corpate-status'], navigationExtras);
  // }


  showe() {
    if (this.checkbox) {

      this.checkbox = false

    }
    else {
      this.checkbox = true
    }

  }




  // captureImage() {
  //   this.isButtonDisabled11 = true
  //   this.add = true
  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.saveImageToDataStore(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedImage = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImageToDataStore(imageData: string) {
  //   this.ngxService.start()
  //   this.dataToSend.imageData = imageData;
  //   const postData = {
  //     data: this.dataToSend,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }
  //     this.ngxService.stop()

  //   })


  // }



  // capture() {
  //   this.isButtonDisabled22 = true
  //   this.add2 = true
  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.saveImageToData(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clicked = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImageToData(imageData: string) {
  //   this.ngxService.start()
  //   this.dataToSend.imageData = imageData;
  //   const postData = {
  //     data: this.dataToSend,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }
  //     this.ngxService.stop()

  //   })


  // }

  // IMG() {
  //   this.isButtonDisabled33 = true

  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.saveImageTo(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedd = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImageTo(imageData: string) {
  //   this.ngxService.start()
  //   this.dataToSend.imageData = imageData;
  //   const postData = {
  //     data: this.dataToSend,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }

  //     this.ngxService.stop()
  //   })







  // }




  click_to_next() {
    this.open3 = true
    this.add = false

  }


  click_to_next2() {
    this.open4 = true
    this.add2 = false

  }




  // ===========================================================================================================

  // captureImage_post() {
  //   this.isButtonDisabled = true
  //   this.add_post = true
  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     this.saveImageT(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedImage_post = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImageT(imageData: string) {
  //   this.ngxService.start()
  //   this.dataTo_post.imageData = imageData;
  //   const postData = {
  //     data: this.dataTo_post,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }
  //     this.ngxService.stop()

  //   })


  // }

  // capture_post() {
  //   this.isButtonDisabled_to = true
  //   this.add2_post = true
  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     this.saveImage(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.secoundimg_post = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImage(imageData: string) {
  //   this.ngxService.start()
  //   this.dataTo_post.imageData = imageData;
  //   const postData = {
  //     data: this.dataTo_post,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }

  //     this.ngxService.stop()
  //   })


  // }

  // Image_post() {

  //   this.isButtonDis = true
  //   console.log("helloo")
  //   const options: CameraOptions = {
  //     quality: 100,

  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     this.saveImag(imageData);
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.threeimg_post = base64Image;

  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });





  // }

  // saveImag(imageData: string) {
  //   this.ngxService.start()
  //   this.dataTo_post.imageData = imageData;
  //   const postData = {
  //     data: this.dataTo_post,
  //   };
  //   var url = "https://techxpertindia.in/api/get_capture_image.php"
  //   return this.http.post(url, postData).subscribe((data) => {
  //     console.log(data);
  //     (error) => {
  //       console.error('Error saving image:', error);
  //     }
  //     this.ngxService.stop()

  //   })


  // }



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





  super() {
    this.ngxService.start();
    {
      this.toast = this.toastController
        .create({
          message: "Thanku For Submit",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
          this.ngxService.stop();
        });

    }
    this.ngxService.start();
    var url = "https://techxpertindia.in/api/add_ticket_finance_details.php";
    return this.http.post(url, this.edit_data).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users;

      console.log(this.obj);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          BookingID: this.BookingID
        }
      }
      this.hidd = false;
      this.grow = true
      this.ngxService.stop();
    });

  }


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

  // add_cost(){
  //   const input5 = document.getElementById("input5") as HTMLInputElement;
  //   const input6 = document.getElementById("input6") as HTMLInputElement;
  //   const input7 = document.getElementById("input7") as HTMLInputElement;
  //   const input8 = document.getElementById("input8") as HTMLInputElement;
  //   const input9 = document.getElementById("input9") as HTMLInputElement;
  //   const resultDiv = document.getElementById("result_1");

  //   function  updateResult() {
  //       const value5 = parseFloat(input5.value) || 0;
  //       const value6 = parseFloat(input6.value) || 0;
  //       const value7 = parseFloat(input7.value) || 0;
  //       const value8 = parseFloat(input8.value) || 0;
  //       const value9 = parseFloat(input9.value) || 0;

  //       const sum = value5 + value6 + value7 + value8 + value9;
  //       resultDiv.textContent = ` ${sum}`;
  //   }


  //   input5.addEventListener("input", updateResult);
  //   input6.addEventListener("input", updateResult);
  //   input7.addEventListener("input", updateResult);
  //   input8.addEventListener("input", updateResult);
  //   input9.addEventListener("input", updateResult);
  //    this.show_cost = true
  // }


  toggleForm() {
    this.showForm = true;
    this.grow = false;
    this.close_icon = true;
  }

  close_icons() {
    console.log("hello")
    this.showForm = false;
    this.grow = true;
    this.close_icon = false
    // this.showForm = false
  }
  calculateResult(): number {
    const number1 = parseFloat(this.calculationForm.get('number1').value) || 0;
    const number2 = parseFloat(this.calculationForm.get('number2').value) || 0;
    const number3 = parseFloat(this.calculationForm.get('number3').value) || 0;
    const number4 = parseFloat(this.calculationForm.get('number4').value) || 0;

    // Perform your calculations here
    return number1 * number2 + number3 + number4
  }
  calculate(): number {
    const number11 = parseFloat(this.calculation.get('number11').value) || 0;
    const number12 = parseFloat(this.calculation.get('number12').value) || 0;
    const number13 = parseFloat(this.calculation.get('number13').value) || 0;
    const number14 = parseFloat(this.calculation.get('number14').value) || 0;

    // Perform your calculations here
    return number11 * number12 + number13 + number14
  }




  Add_cost() {
    if (window) {

      this.final_otp = parseInt(this.DataToSend.C_VisitorNo) * parseInt(this.DataToSend.C_VisitCharge) + parseInt(this.DataToSend.C_MaterialCost) + parseInt
        (this.DataToSend.C_LabourCost)
      this.final_otp = (this.final_otp).toString();
      this.DataToSend.C_TotalPrice = this.final_otp;

      console.log(this.final_otp)

      this.final_otp_price = parseInt(this.DataToSend.T_VisitorNo) * parseInt(this.DataToSend.T_VisitCharge) + parseInt(this.DataToSend.T_MaterialCost) + parseInt
        (this.DataToSend.T_LabourCost)
      this.final_otp_price = (this.final_otp_price).toString();
      this.DataToSend.T_TotalPrice = this.final_otp_price

      console.log(this.final_otp_price)


      this.ngxService.start();
      var url = "https://techxpertindia.in/api/add_corporate_ticket_finance.php";
      return this.http.post(url, this.DataToSend).subscribe((data) => {
        console.log(data);
        this.users = data;
        this.obj = this.users;

        console.log(this.obj);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            BookingID: this.BookingID
          }
        }
        // this.router.navigate(["cop-current-tickets"], navigationExtras)
        this.grow = true;
        this.showForm = false;
        var url = "https://techxpertindia.in/api/get_corporate_ticket_finance_by_ticketid.php";
        return this.http
          .post(url, this.cost, {
            headers: new HttpHeaders({ "content-Type": "application/json" }),
          })
          .subscribe((data) => {
            console.log(data);
            this.valid_cost = data
            if (this.valid_cost.error == true) {
              this.costly = true
            } else {
              this.costly = false
            }

            this.ngxService.stop()



          }

          )

      });



    }

  }

  advance_cost() {


    var url = "https://techxpertindia.in/api/get_corporate_ticket_finance_by_ticketid.php";
    return this.http
      .post(url, this.cost, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((data) => {
        console.log(data);
        this.valid_cost = data
        if (this.valid_cost.error == true) {
          this.costly = true
        } else {
          this.costly = false
        }





      }

      )
  }
  Remark = false;

  onSelectRemark(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
    if (this.selectedValue) {
      this.Remark = true

    }


  }














}








































