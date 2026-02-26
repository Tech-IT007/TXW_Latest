import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-corprate-city-lead',
  templateUrl: './corprate-city-lead.page.html',
  styleUrls: ['./corprate-city-lead.page.scss'],
})
export class CorprateCityLeadPage implements OnInit {
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
  show = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();

  }

  ngOnInit() { }

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
      // this.Service_status()
      // this.Asginchange()
    })
  }
  Getdata() {
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
      });

     
  }


  Asginchange() {
    var url = "https://techxpertindia.in/api/get_assigned_to_list.php";
    return this.http.post(url, this.Asgin).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data;
      console.log(this.obj);
      this.assin = data
   this.assin = this.assin.data
   console.log(this.assin)
       
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
  }

}




























































