import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
// import { UserService } from "src/Api/user.service";
import { PopoverComponent } from "../popover/popover.component";

@Component({
  selector: 'app-home-city-lead',
  templateUrl: './home-city-lead.page.html',
  styleUrls: ['./home-city-lead.page.scss'],
})
export class HomeCityLeadPage implements OnInit {
  role: any;
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

  show = false

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
  ) {





    this.runHttp();


    this.name = localStorage.getItem("username");
    this.use.username = localStorage.getItem("username");


    // console.log(this.role)
      
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

    this.http
      .get('https://techxpertindia.in/api/get_user_app_version.php')
      .subscribe((data) => {
        console.log(data);
        this.car = data;
        console.log(this.car.version);
        this.version = this.car.version;
        console.log(this.version);
        this.onInit(1);

      });
  }


  async onInit(ev: any) {
    if (this.version < this.appversion ) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        cssClass: 'my-custom-class',
        event: ev,
        backdropDismiss: false,
        translucent: true,
      });
      await popover.present();

      // const { role } = await popover.onDidDismiss();
      // console.log('onDidDismiss resolved with role', role);
    }



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

    if(this.role === "City Lead"  ){

      this.city_lead = true
     }

     else {
    this.city_lead = false
     }

   }

  runHttp() {

    this.use.start_counter = 0;
    this.use.username = localStorage.getItem("username");
    var url = "https://techxpertindia.in/api/get_city_assigned_tickets_home_services.php";
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






}







