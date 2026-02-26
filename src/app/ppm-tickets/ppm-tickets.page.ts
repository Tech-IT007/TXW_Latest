
import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-ppm-tickets',
  templateUrl: './ppm-tickets.page.html',
  styleUrls: ['./ppm-tickets.page.scss'],
})
export class PpmTicketsPage implements OnInit {


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

  ionViewWillEnter() {
    this.runHttp()
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
    var url = "https://techxpertindia.in/api/get_assigned_ppm_tickets_v2.php"
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
    this.router.navigate(['ppm-view-details'], navigationExtras);
  }



  changeButtonColor(buttonNumber: number) {
  if (buttonNumber === 1) {
    this.button1Color = 'red'; // Change to the desired color for Button 
}
  
  
}
  
roles() {
  const role = localStorage.getItem('role');

  if (role) {
    console.log(role); // Log the role for debugging

    // Split roles into an array
    let rolesArray = role.split(',');
    console.log(rolesArray);

    // Check if both 'City Corporate Lead' and 'Branch Account Manager' are in rolesArray
    if (
      rolesArray.includes('Branch Account Manager') ||
      rolesArray.includes('City Corporate Lead') ||
      rolesArray.includes('Account Manager')
    ) {
      console.log('hello');
      this.router.navigateByUrl('/corporate-all-tickets');

      // Check if either 'Technician' or 'Vendor' is in rolesArray
    } else if (
      rolesArray.includes('Technician') ||
      rolesArray.includes('Vendor')
    ) {
      this.router.navigateByUrl('/all-ppm-tickest');
    }
  } else {
    console.error('No role found in localStorage');
  }
}


  }




























