
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  toast: any;
   
  testvar: any;
userId: any;
  Test: any;
 view : any = {}  
  send = {
     "Pending":"",
     "Complet":"",
    "Under":"",
    "Reject": "",
    "Not available": "",
    "other" :"",
      "Remark": ""
  };


  Users: any;
  impact_data : any;

  test_variable : any;
 



  dataToSend ={

    "bookingID":""
  }

  impact: any = {}  
  BenefitsAvailed: Object = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,  public toastController: ToastController, public router: Router, public loadingCtrl: LoadingController) { 
    
  }

  ngOnInit() {
   

  }
  




submit() {
   
  var api = "https://techxpertindia.in/api/get_booking_status.php";
  console.log(this.send);
  
  this.send=this.impact;

  console.log(this.send)

  this.toast = this.toastController
  .create({
    message: "Status of User Updated !",
    duration: 2000,
  })
  .then((toastData) => {
    console.log(toastData);
    toastData.present();
  });
 return this.http.post(api,this.send,{headers:new HttpHeaders({"content-Type":"application/json"})

}) .subscribe(response=>{
  console.log(response)
  this.impact = response;

  this.router.navigateByUrl('home')
})

      
}
  



}























































