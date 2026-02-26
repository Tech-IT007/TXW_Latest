import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
// import { UserService } from "src/Api/user.service";
import { PopoverComponent } from "../popover/popover.component";

@Component({
  selector: 'app-account-tickets',
  templateUrl: './account-tickets.page.html',
  styleUrls: ['./account-tickets.page.scss'],
})
export class AccountTicketsPage implements OnInit {
  search : boolean;
  role: any;
  searchTerm :string
  city_lead = false;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
show = false ;
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
    
      "EmployeeID":localStorage.getItem("EmployeeID")
  
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
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public popoverController: PopoverController,
    private ngxService: NgxUiLoaderService
  ) {
    this.name = localStorage.getItem("username");
    this.use.username = localStorage.getItem("username");
    this.runHttp();

    interface PopoverOptions {
      component: any;
      componentProps?: { [key: string]: any };
      showBackdrop?: false;
      backdropDismiss?: false;
      translucent?: boolean;
      cssClass?: 'my-custom-class';
      event?: Event;
      animated?: boolean;

      mode?: 'ios' | 'md';
      keyboardClose?: boolean;
      id?: string;
    }


  }

  ngOnInit() {

    this.role = localStorage.getItem("role")
    console.log(this.role)
    if(this.role === "City Corporate Lead" ){

      this.city_lead = true
     }

     else {
    this.city_lead = false
     }

  

     
   
   }

  runHttp() {
    this.ngxService.start()
    this.use.start_counter = 0;
    this.use.username = localStorage.getItem("username");
    var url = "https://techxpertindia.in/api/get_account_manager_tickets.php";
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.users = data
      this.obj = this.users.data
      console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.error      
      console.log(this.temp)
      
      if(this.temp == true){
        this.show = true 
         this.search = false
      }else{
        this.show = false;
        this.search = true
      }
      this.ngxService.stop()
    });
  }


  route_to_profile_answer_screen(userID) {
    this.BookingID = userID;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }

    this.router.navigate(['coprate-account-details'], navigationExtras);
  }








}























