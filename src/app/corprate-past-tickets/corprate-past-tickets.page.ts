
import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-corprate-past-tickets',
  templateUrl: './corprate-past-tickets.page.html',
  styleUrls: ['./corprate-past-tickets.page.scss'],
})
export class CorpratePastTicketsPage implements OnInit {
  BookingID: any;
  role: any
  city_lead =false
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
     this.runHttp()
    }, 2000);
  }
  show = false
  temp: any;
  user: any;
  obj: any;
  users: any;
  userid: any;
  Test: any;
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
    "role" : localStorage.getItem("role")
  }
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,

    public router: Router,
    public loadingCtrl: LoadingController
  ) {


    this.runHttp()
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

    setTimeout(() => {

      this.router.navigate(['/corprate-past-tickets']);
    }, 1000); //
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

    this.user = localStorage.getItem("phonenumber");
    console.log(this.user)
    var url = "https://techxpertindia.in/api/get_assigned_completed_corporate_tickets.php"
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data
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


  route_to_profile_answer_screen(userID) {
    this.BookingID = userID;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }
    this.router.navigate(['cop-current-tickets'], navigationExtras);
  }





}
































