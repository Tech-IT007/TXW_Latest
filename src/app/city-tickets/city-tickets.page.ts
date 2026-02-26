import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
// import { UserService } from "src/Api/user.service";
import { PopoverComponent } from "../popover/popover.component";

@Component({
  selector: 'app-city-tickets',
  templateUrl: './city-tickets.page.html',
  styleUrls: ['./city-tickets.page.scss'],
})
export class CityTicketsPage implements OnInit {
  role: any;
  searchTerm :string
  city_lead = false;
  serach: boolean;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      window.location.reload();
    }, 2000);
  }
show = false ;
showbutton = false
  version: any;
  appversion = '9.4';
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
    
      "EmployeeID":localStorage.getItem("EmployeeID"),
    start_counter: 0,
    no_of_records: 5,
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





    this.runHttp();


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
    var url = "https://techxpertindia.in/api/get_city_assigned_tickets.php";
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data;
      console.log(this.obj);
      this.temp = data 
      this.temp = this.temp.data.length
      console.log(this.temp)
      
      if(this.temp == "0"){
        this.show = true ;
      this.serach = false;
      }else{
        this.show = false;
        this.serach = true;
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
    this.router.navigate(['city-view'], navigationExtras);
  }






  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
  
      this.dataToSend.start_counter = this.dataToSend.start_counter + 5;
      var url =  "https://techxpertindia.in/api/get_city_assigned_tickets.php "
    console.log(this.user);
    return this.http.post(url,this.dataToSend ,{headers:new HttpHeaders({"content-Type":"application/json"})})
    .subscribe(data => {
      console.log(data);
      this.users = data;
      this.temp = this.users.data;
      this.obj = this.obj.concat(this.temp);
      console.log(this.obj);
    
    });
  
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    
    }, 500);
  }
  
  
  
  doRefresh(event) {
    console.log('Begin async operation');
   this.runHttp()
  
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  


}










