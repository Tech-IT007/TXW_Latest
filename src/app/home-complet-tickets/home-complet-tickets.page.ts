import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { PopoverComponent } from "../popover/popover.component";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-home-complet-tickets',
  templateUrl: './home-complet-tickets.page.html',
  styleUrls: ['./home-complet-tickets.page.scss'],
})
export class HomeCompletTicketsPage implements OnInit {
  role: any;
  show = false;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    this.runHttp() 
    }, 2000);
  }
city_lead = false ;
showbutton = false 
  version: any;
  appversion = '1.0';
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
    "EmployeeID": localStorage.getItem("EmployeeID")
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
  
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController,
  ) {





    this.runHttp();


    this.name = localStorage.getItem("username");
    this.use.username = localStorage.getItem("username");


    // console.log(this.role)
      





    // if(this.role == "Region Lead" ){

    //   this.city_lead = true
    //  }

    //  else {
    // this.city_lead = true
    //  }


  }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    
   
    this.role = this.role 

    console.log(this.role)

    // if(this.role === "City Lead"  ){

    //   this.city_lead = true
    //  }

    //  else {
    // this.city_lead = false
    //  }

   }

   runHttp() {
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

    this.use.start_counter = 0;
    this.use.username = localStorage.getItem("username");
    var url = "https://techxpertindia.in/api/get_assigned_completed_home_services_tickets.php";
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      // console.log(data);
      this.users = data;
      this.obj = this.users.data;
      // console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.data.length
      // console.log(this.temp)
      
      if(this.temp == "0"){
        this.show = true 
      
      }else{
        this.show = false
      }

    });
  }, 100);
  }


  route_to_profile_answer_screen(userID) {
    this.BookingID = userID;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }
    this.router.navigate(['profile'], navigationExtras);
  }




  past(){
    this.runHttp() 

    }
  
  
    Current(){
    this.router.navigateByUrl("home")
  }


}











