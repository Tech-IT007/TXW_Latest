
import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-desboard-view-homecare',
  templateUrl: './desboard-view-homecare.page.html',
  styleUrls: ['./desboard-view-homecare.page.scss'],
})
export class DesboardViewHomecarePage implements OnInit {

  BookingID: any;
  buttonColor: any;
  button1Color: string = 'blue';

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.runHttp ()
    }, 2000);
  }
  show = false; 
  role : any;
  city_lead  :any;
  temp: any;
  user: any;
  obj: any;
  users: any;
  userid: any;
  status:any;
  Test: any;
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
    "Status":localStorage.getItem("status")
    
  }
  constructor(
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {


  }
  ngOnInit() {
    this.role = localStorage.getItem("role")
    
   
    this.role = this.role 

    console.log(this.role)

    if(this.role === "City Corporate Lead" ){

      this.city_lead = true
     }

     else {
    this.city_lead = false
     }

   

    this.runHttp()
  }


  runHttp() {


    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    this.user = localStorage.getItem("phonenumber");
    console.log(this.user)
    var url = "https://techxpertindia.in/api/get_vendor_tickets_status_with_employee.php"
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


  // route_to_profile_answer_screen(userID) {
  //   this.BookingID = userID;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       BookingID: this.BookingID
  //     }
  //   }
  //   this.router.navigate(['ppm-assgine-status'], navigationExtras);
  // }
  route_to_profile_answer_screen(userID) {
    this.BookingID = userID;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }
    this.router.navigate(['deshbord-view-details'], navigationExtras);
  }


  changeButtonColor(buttonNumber: number) {
  if (buttonNumber === 1) {
    this.button1Color = 'red'; // Change to the desired color for Button 
}
  
  
}
  


  }


















