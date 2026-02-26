import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-visitor-clint-details',
  templateUrl: './visitor-clint-details.page.html',
  styleUrls: ['./visitor-clint-details.page.scss'],
})
export class VisitorClintDetailsPage implements OnInit {

  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
          
          this.all_services_report()
     }

     button :boolean

    user_id:any = {
      "BranchID":localStorage.getItem("Vistior_branch_id"),
    }
  userdetails  = {
    "BranchID":localStorage.getItem("Vistior_branch_id"),
    "VisitTitle":"",
    "ReportNumber":"",
    "ContactPerson":"",
    "ContactPersonPhone":"",
    "ContactPersonEmail":"",
    "CreatedBy":localStorage.getItem("workname"),
  };
  toast: any;

  hidd_pad:boolean = true;
  ngOnInit() {
   
  }
  sign = {
    "imageData" : "",
    "TicketID":localStorage.getItem("ID"),
    "GeneralServiceReportID":localStorage.getItem("Genral_services_report"),
  }

submit(){
    if(this.userdetails.VisitTitle == "" ){
      this.toast = this.toastController
      .create({
        message: "Visit Detais is mandatory",
        duration: 2000,
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }else{
      this.toast = this.toastController
      .create({
        message: "Data Inserted",
        duration: 2000,
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
      var url ="https://techxpertindia.in/api/site_visits/initiate_site_visits.php"

      return this.http.post(url,this.userdetails).subscribe((data)=>{
       console.log(data)
       this.router.navigateByUrl("/visitor-all-tickets")
      })
         
    }

  }

 person: any 
 email:any 
 number :any 
all_services_report(){
  var url = "https://techxpertindia.in/api/branch/get_branch_details.php"
  return this.http.post(url , this.user_id).subscribe((data)=>{
     console.log(data)  
   this.clint_data = data
     console.log(this.clint_data)
   this.person = data
   this.person = this.person.SiteIncharge
   this.userdetails.ContactPerson= this.person
   this.email = data 
   this.email = this.email.BranchEmail
   this.userdetails.ContactPersonEmail = this.email
   this.number = data 
   this.number = this.number.BranchMobile
   this.userdetails.ContactPersonPhone = this.number;

  })
}

}













