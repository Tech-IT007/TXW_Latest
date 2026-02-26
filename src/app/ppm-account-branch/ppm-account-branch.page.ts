
import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-ppm-account-branch',
  templateUrl: './ppm-account-branch.page.html',
  styleUrls: ['./ppm-account-branch.page.scss'],
})
export class PpmAccountBranchPage implements OnInit {


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
  Test: any;
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID")
  }
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
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
    var url = "https://techxpertindia.in/api/ppm_tickets/get_branch_account_manager_ppm_tickets.php"
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
    // this.router.navigate(['ppm-assgine-status'], navigationExtras);
    this.router.navigate(['ppm-account-view-details'], navigationExtras);
  }



  changeButtonColor(buttonNumber: number) {
  if (buttonNumber === 1) {
    this.button1Color = 'red'; // Change to the desired color for Button 
}
  
  
}
  
  

  }





































