import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../popover/popover.component";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
// import { UserService } from "src/Api/user.service";

import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-home-care',
  templateUrl: './home-care.page.html',
  styleUrls: ['./home-care.page.scss'],
})
export class HomeCarePage implements OnInit {
  role: any;
  show = false;
  update: any;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
  
     this.test()
    }, 2000);
  }
city_lead = false ;
showbutton = false 
  version: any;
  appversion = '9.5';
  car: any;
  subscribe: any;

  view: boolean;

  BookingID: any;

  bookingdata: any = {
    BookingID: "",
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
  };

  temp: any;
  user: any;
  obj: any;
  users: any;

  dataToSend: any = {
    "TechnicianID": localStorage.getItem("EmployeeID")
  };
  dataRecieved: any;
  profilepage: any;
  run: boolean = false;
  userid: any;
  Test: any;
  use: any = {
    role: localStorage.getItem("role"),
    username: "",
    start_counter: 0,
    no_of_records: 8,
  };
  name: any = {
    name: "",
  };

  constructor(
    private route: ActivatedRoute,
    // public userService: UserService,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController,
  ) {
    this. test() 
    this.name = localStorage.getItem("username");
    this.use.username = localStorage.getItem("username");
  }


  ionViewWillEnter() {
    this.test()
  }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    this.role = this.role 
    console.log(this.role)

   }

  test() {


    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    this.use.start_counter = 0;
    this.use.username = localStorage.getItem("username");
    var url = "https://techxpertindia.in/api/my_homecare_booking_list.php";
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data;
      console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.data.length
      console.log(this.temp)
      
      if(this.temp == "0"){
        this.show = true 
      
      }else{
        this.show = false
      }

    });
  }, 100);
  }


  openTicket(BookingCode) {
    this.BookingID = BookingCode;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }
    this.router.navigate(['home-care-details'], navigationExtras);
  }


  Current(){
  this.test()
  }


past(){
  this.router.navigateByUrl("home-complet-tickets")
}
}






















