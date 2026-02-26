import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, AlertController, ModalController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { error } from "console";



@Component({
  selector: 'app-home-care-details',
  templateUrl: './home-care-details.page.html',
  styleUrls: ['./home-care-details.page.scss'],
})
export class HomeCareDetailsPage implements OnInit {

statu : any 
serve: any;
button = false
  status_hide : boolean ;
  toast: any;
  temp: any;
  approvel_data = {
  "BookingCode": "",
  "LeadID":  localStorage.getItem("EmployeeID"),
  };
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
  };
  Start_work:boolean;
  complet_work :boolean; 
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

  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;

  test_variable: any;
  ID: any;
  dataToSend = {
   BookingCode: ""
  }

  BookingID: any;

  impact: any = {};
status :any
  book: string;
  users: any;
obj: any[] = [];             
filteredTechnicians: any[] = [];
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
show = false;
 self = true
  role: any;
  WIP: boolean;
  isAssignModalOpen: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
      private alertController: AlertController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
  ) {
    this.detailsview();
  }
otp_details = {
BookingCode: ""
}
  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.role)
  }
  detailsview() {
    this.Get()

  }
  Asgin_data = {
    BookingID :localStorage.getItem("ID")
  };
  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.BookingCode = params.BookingID;

        this.BookingID = params.BookingID
        this.approvel_data.BookingCode = this.BookingID
        this.otp_details.BookingCode = this.BookingID

        localStorage.setItem("BookingCode", this.BookingID)
        console.log(this.BookingID)

      }

      this.Getdata();
  
    })
  }
  Getdata() {
    

    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/my_homecare_booking_ticket_details_by_booking_code.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response
        console.log(this.ID)
        this.ID = this.ID.booking.ID
        this.ID = localStorage.setItem("ID", this.ID)
        this.ID = localStorage.getItem("ID")
       
        this.impact = response;
        this.impact = this.impact.booking;
        console.log(this.impact)
        if(this.temp == "0"){
          this.show = true 
        
        }else{
          this.show = false
        }
        this.serve = response 
        this.serve = this.serve.data.Status
        console.log(this.serve)
       this.serve = localStorage.setItem("Status_value",this.serve)
       this.serve = localStorage.getItem("Status_value")   
         
        if(this.serve === "Closed" ){
          this.button = false;
          this.complet_work = true;
          this.Start_work = false;
          this.WIP = false;
        }else{
          this.button = true;
          this.Start_work = true;
          this.complet_work = false;
          this.WIP = false;
        }
        if(this.serve == "Work In Progress"){
         this.WIP = true;
        this.complet_work = false;
        this.Start_work = false
        }




      });
      
    }, 100);
  }


  route_to_profile_answer_screen(BookingCode) {
    this.BookingID = BookingCode;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }


    if (this.role == "Vendor" || this.role == "Technician") {
      var url = "https://techxpertindia.in//api/start_otp_booking_services.php";
      return this.http.post(url, this.otp_details).subscribe((response)=>{
        console.log(response);
              this.router.navigate(['verified-home-care'], navigationExtras);
      })


  
    } else {
    //  this.tea = false;
    //   this.hide = true;
      this.router.navigate(['assig-page'], navigationExtras);
  
  
    }
   
  }


  route_to_profile(BookingCode) {
    this.BookingID = BookingCode;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }

      this.router.navigate(['assig-page'], navigationExtras);

  }






}