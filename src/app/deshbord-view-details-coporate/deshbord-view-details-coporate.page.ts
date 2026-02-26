import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";



@Component({
  selector: 'app-deshbord-view-details-coporate',
  templateUrl: './deshbord-view-details-coporate.page.html',
  styleUrls: ['./deshbord-view-details-coporate.page.scss'],
})
export class DeshbordViewDetailsCoporatePage implements OnInit {
  toast: any;
 

  temp: any;
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
  };

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
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;

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
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();

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
    setTimeout(() => {
      this.ngxService.stop();
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


        this.serve = response 
        this.serve = this.serve.data.Status
        console.log(this.serve)

        if(this.serve === "Closed" ){
          this.button = false

        }else{
          this.button = true
        }


this.date = response
this.date = this.date.data.DueDate
console.log(this.date)

this.date = localStorage.setItem("Date",this.date)
this.date = localStorage.getItem("Date")
console.log(this.date)


      });

    }, 100);
  }


  Asginchange() {
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
    setTimeout(() => {
      this.ngxService.stop();


    var url = "https://techxpertindia.in/api/change_booking_status.php";
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
    });
  }, 100);
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
  this.router.navigate(['corpate-status'], navigationExtras);
}
  
}










































































