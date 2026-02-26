import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ClintTicketsEditComponent } from "../clint-tickets-edit/clint-tickets-edit.component";

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.page.html',
  styleUrls: ['./city-view.page.scss'],
})
export class CityViewPage implements OnInit {
  // options: CameraOptions = {
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  
  closer : boolean;
  row :boolean = true
 water : boolean =true
  emp : any;
  img = true
  img2 = true
  toast: any;
  role : any;
  tea = true
  img22 = true
  hide = false
  temp: any;
  bookingdata: any = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "Close",
    UpdatedBy: "admin",
    AssignedTo:  localStorage.getItem("empl_ID"),
    DueDate: localStorage.getItem("Date"),
  

  };
  dataTo = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("username"),
    "Action"  :  "pre_img"

  }

  message: any;
  status_services = {
    Pending: "",
    "In Progress": "",
  };
  Asgin = {
    Name: localStorage.getItem("role"),
    ID: localStorage.getItem("ID")
  };
  services_data: any;
   use: any;
   otp: any;
   Branch_Tickets_Id : any;
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;
profile:any
  test_variable: any;
  ID: any;

  dataToSend = {
    TicketID: ""
  }


  BookingID: any;

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
  button = false
  date :any;
show = false;
  isButtonDisabled11: boolean;
  add = false
  clickedImage: string;
  isButtonDisabled22: boolean;
  add2: boolean;
  clicked: string;
  isButtonDisabled33: boolean;
  clickedd: string;
  open3: boolean;
  open4: boolean;
  rol: string;
  order: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public popoverController: PopoverController,
    // private camera: Camera,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();

    this.role = localStorage.getItem("role")
    console.log(this.role)
    if (this.role == "Vendor" || this.role == "Technician") {
      
     this.row = false
   }else
   this.water = false
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
        this.dataToSend.TicketID  = params.BookingID;

        this.BookingID = params.BookingID
        console.log(this.BookingID)

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
        this.Branch_Tickets_Id = response
        this.Branch_Tickets_Id = this.Branch_Tickets_Id.data.BranchID
      //  alert(this.Branch_Tickets_Id)
      this.Branch_Tickets_Id = localStorage.setItem("branch_tickets_id",this.Branch_Tickets_Id)
      this.Branch_Tickets_Id = localStorage.getItem("branch_tickets_id")
      console.log(this.Branch_Tickets_Id)

        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact);
        this.temp = response
        this.temp = this.temp.data.length
        console.log(this.temp)
        
        if(this.temp == "0"){
          this.show = true 
        
        }else{
          this.show = false
        }

        this.order = response;
        this.order = this.order.data.EmployeeName
        console.log(this.order)
        this.serve = response 
        this.serve = this.serve.data.Status
        console.log(this.serve)

        if( this.serve == "Closed"){
          this.button = false
        
        }else{
          this.button = true
          // this.water = true
          this.closer = false
        }


this.date = response
this.date = this.date.data.DueDate
console.log(this.date)

this.date = localStorage.setItem("Date",this.date)
this.date = localStorage.getItem("Date")
console.log(this.date)
    
this.emp = response
this.emp = this .emp.data.AssignedTo
 console.log(this.emp)
 this.emp = localStorage.setItem("empl_ID", this.emp)
 this.emp  = localStorage.getItem("empl_ID")
 console.log(this.emp)
this.ngxService.stop()

      });
  
      
  }


  Asginchange() {
    this.ngxService.start()
    var url = "https://techxpertindia.in/api/get_assigned_to_list.php";
    return this.http.post(url, this.Asgin).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.users = this.users.data["Name"]

      console.log(this.users);
  //     this.assin = data
  //  this.assin = this.assin.data
  //  console.log(this.assin)
  //  this .assin = localStorage.setItem("Cureent_status",this.assin)
  //  this.assin = localStorage.getItem("Cureent_status")
  //  console.log(this.assin)
  this.ngxService.stop()
    });
  }
  Service_status() {
    var url = "https://techxpertindia.in/api/get_corporate_ticket_status.php";
    return this.http.post(url, this.status_services).subscribe((data) => {
      console.log(data);
      this.use = data;
      this.otp = this.use
       console.log(this.obj)
       this.serve = data
       console.log(this.serve)
    });
  }


  Service_Change_Status() {
    this.ngxService.start()
 
    var url = "https://techxpertindia.in/api/change_ticket_status.php";
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
      this.router.navigate(["rocket"],navigationExtras)
      this.ngxService.stop()
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

route_to_profile_answer_screen(BookingID) {
  this.BookingID = BookingID;
  let navigationExtras: NavigationExtras = {
    queryParams: {
      BookingID: this.BookingID
    
    }
  
  }

  this.router.navigate(['city-submit-closer'], navigationExtras);

 

}
  



}























































