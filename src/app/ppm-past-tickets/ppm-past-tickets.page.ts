
import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-ppm-past-tickets',
  templateUrl: './ppm-past-tickets.page.html',
  styleUrls: ['./ppm-past-tickets.page.scss'],
})
export class PpmPastTicketsPage implements OnInit {
  selectedOption :any = {

  }
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
    "EmployeeID": localStorage.getItem("EmployeeID")
  }
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
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
    // setTimeout(() => {

    //   this.router.navigate(['/corprate-past-tickets']);
    // }, 1000); //


    this.user = localStorage.getItem("phonenumber");
    console.log(this.user)
    var url = "https://techxpertindia.in/api/get_assigned_completed_ppm_tickets.php"
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
  }


  // route_to_profile_answer_screen(userID) {
  //   this.BookingID = userID;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID
  //     }
  //   }
  //   this.router.navigate(['cop-current-tickets'], navigationExtras);
  // }





}


































