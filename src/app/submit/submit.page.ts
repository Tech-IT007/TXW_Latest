import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CalendarComponentOptions } from 'ion2-calendar'
// import { Camera ,CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

  rocke: any = "None"
  // options: CameraOptions = {
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

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

  spare = {
    "TicketID": localStorage.getItem("ID"),
    "SparePartDecs": ""
  }

  edit_data = {
    "TicketID": localStorage.getItem("ID"),
    "CallType": "",
    "CustumerPrice": "",
    "ExpensePrice": "",
    "Description": ""
  }



  dataToSend = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "Service Report"

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


  isButtonDisabled: boolean = false;
  isButtonDisable: boolean = false



  toast: any;
  temp: any;


  bookingdata: any = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
    DueDate: localStorage.getItem("Date"),

  };
   OTP :any = {
    "TicketID": localStorage.getItem("ID"),
     "TicketStatus": "Generate OTP to Close",
     "UpdatedBy": localStorage.getItem("workname"),
     "AssignedTo": localStorage.getItem("empl_ID"),
     "DueDate":localStorage.getItem("Date")
  }
  isButtonDisabled_to: boolean = false;
  isButtonDis: boolean = false
  img2 = true

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

  Asgin = {
    TicketID: localStorage.getItem("ID"),
    ID: localStorage.getItem("ID")
  };
  services_data: any;
  clickedImage: string;
  clickedd: string
  clickedImage_post: string;
  closer :boolean;
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
  Branch_Ticket_id :any;
  status: Boolean = false;
  hidden: Boolean = true;
  wwe: Boolean = false;
  sign: Boolean = false;
  show = false;
  selectedValue: any;
  assginvalue: any;
  edit_value: any
  predata: any;
  isButtonDisabled11: boolean;
  isButtonDisabled22: boolean;
  isButtonDisabled33: boolean;
  hidd: boolean
  otr: boolean = true;
  grow: boolean = true
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    // private camera: Camera,
    private ngxService: NgxUiLoaderService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.spare.SparePartDecs = "No"

    this.emp  = localStorage.getItem("empl_ID")
     console.log(this.emp)
    this.detailsview();
    this.OTP.TicketStatus = "Generate OTP to Close"

  }



  ngOnInit() {
   


    // if(this.bookingdata.TicketStatus == undefined  || this.bookingdata.TicketStatus == "") this.bookingdata.TicketStatus = "Raise";
    this.rol = localStorage.getItem("ASSto")
    console.log(this.rol)

    this.role = localStorage.getItem("role")
    console.log(this.role)
    if (this.role == "Vendor" || this.role == "Technician") {
      this.close = false
        this.raise = false
    } else {
      this.close = true
      this.raise = true
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
      this.Asginchange()
    })
  }
  Getdata() {


    this.ngxService.start()



    var url = "https://techxpertindia.in/api/get_corporate_ticket_detail.php";
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
        this.ngxService.stop();
      });


  }

  // onSelectChange(event: any) {
  //   this.selectedValue = event.detail.value;
  //   console.log(this.selectedValue)
  //   if (this.selectedValue == "Closed") {
  //     this.hidden = true
  //   } else {
  //     this.hidden = false
  //   }
  //   if (this.selectedValue == "Closed") {
  //     this.status = false

  //   } else {
  //     this.status = true
  //   }

  // }

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
  Asginchange() {

    var url = "https://techxpertindia.in/api/get_assigned_to_list.php";
    return this.http.post(url, this.Asgin).subscribe((data) => {
      console.log(data);
      this.mic = data;
      this.mic = this.mic.data
      console.log(this.mic)
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
    this.ngxService.start();
        var url = "https://techxpertindia.in/api/change_ticket_status.php";
        // var url = "https://techxpertindia.in/api/generate_otp_for_closure.php";
        return this.http.post(url, this.OTP).subscribe((data) => {
          console.log(data);
          this.users = data;
          this.obj = this.users;

          console.log(this.obj);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              BookingID: this.BookingID
            }
          }
          this.router.navigate(["opt-submit"], navigationExtras)
          this.ngxService.stop();
        });

      
    
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





  click_to_next() {
    this.open3 = true
    this.add = false

  }


  click_to_next2() {
    this.open4 = true
    this.add2 = false

  }




  // ===========================================================================================================


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
    if (this.edit_value == "Yes") {
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



  




  super() {
    this.ngxService.start();
    {
      this.toast = this.toastController
        .create({
          message: "Please Enter All Your  Details",
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
}






















