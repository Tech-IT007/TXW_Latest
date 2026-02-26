import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-past',
  templateUrl: './past.page.html',
  styleUrls: ['./past.page.scss'],
})
export class PastPage implements OnInit {
  show = false;
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      window.location.reload();
    }, 2000);
  }
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
    username: localStorage.getItem("username"),
  };
  dataRecieved: any;
  profilepage: any;
  run: boolean = false;
  userid: any;
  Test: any;
  use: any = {
    role: localStorage.getItem("RoleC"),
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
    public loadingCtrl: LoadingController

  ) {
    this.runHttp()
    this.name = localStorage.getItem("username");
    this.use.username = localStorage.getItem("username");
    console.log(this.use.role);

  }

  ngOnInit() {
  }
  runHttp() {

    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

    this.use.start_counter = 0;
    this.use.username = localStorage.getItem("username");
    var url = "https://techxpertindia.in/api/get_bookings.php";
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
}
