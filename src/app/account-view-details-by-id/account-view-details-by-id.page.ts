
import { Component, OnInit } from "@angular/core";

import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CalendarComponentOptions } from 'ion2-calendar'



@Component({
  selector: 'app-account-view-details-by-id',
  templateUrl: './account-view-details-by-id.page.html',
  styleUrls: ['./account-view-details-by-id.page.scss'],
})
export class AccountViewDetailsByIdPage implements OnInit {
  showForm = false;
  calculationForm: FormGroup;
  calculation: FormGroup;
  costly = true
  submit_closer = false
  Techxpert_cost : any;

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
  DataToSend  = {
    "TicketID": localStorage.getItem("ID"),
  
  "C_VisitorNo":"",
  "C_VisitCharge":"",
  "C_MaterialCost":"",
  "C_LabourCost":"",
  "C_CostumerPrice":"",
  "C_TotalPrice":"",
  "T_VisitorNo":"",
  "T_VisitCharge":"",
  "T_MaterialCost":"",
  "T_LabourCost":"",
  "T_CostumerPrice":"",
  "T_TotalPrice":"",
   "Status":"1"
  }
  bookingdata = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
    Remark  : "",
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
  final_otp_price : any;
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
  show = false;
  Type: any;
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
  closers: any;
  close_icon: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private camera: Camera,
    private ngxService: NgxUiLoaderService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {

  this.detailsview()
  }



  ngOnInit() {

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

        this.Type = response;
        this.Type = this.Type.data.Type
        console.log(this.Type)

        if (this.Type == "AMC") {
          this.teemp = true
        } else {
          this.teemp = false
        }

        this.closers = response 
        this.closers = this.closers.data.Status                                         
        console.log(this.closers)


        if(this.closers == "Submitted for Closure"){

          this.raise = false
          this.submit_closer = true
        }else{
          this.raise = true
          this.submit_closer = false
        }


        this.ngxService.stop();
      });


  }
  

  }























