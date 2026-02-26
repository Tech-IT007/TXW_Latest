import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ToastController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.page.html',
  styleUrls: ['./services-details.page.scss'],
})
export class ServicesDetailsPage implements OnInit {
hidd_pad:boolean = true;
clint_details = {
  ReportID: localStorage.getItem("Report_id"),
"token": localStorage.getItem("Token"),
ClientRepresentative : "",
ClientRepresentativeContact :"",
ClientRepresentativeEmails  :"",
ClientRepresentativeDesignation:"",
Remarks : "",
action: "submit",
}

  capturedImage: string; // Variable to hold the URI of the captured image
  capturedImage2 : string;
  isButtonDisabled_save:boolean = false;
  image : string;
  toast: any;
  isButtonDisabled : boolean;
  hidd = false;
  sign = {
    "imageData" : "",
    GeneralServiceReportID: localStorage.getItem("Genral_services_report"),
    "TicketID":"",
  }

  icon = false

  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;

  constructor( public router : Router,
    public http : HttpClient , public toastController: ToastController,) { }

  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  clearSignature() {
    this.signaturePad.clear();
   this.isButtonDisabled_save = false;
  }

  saveSignature(){
    

    this.hidd_pad = false;
    const signatureData = this.signaturePad.toDataURL();

    if(signatureData.startsWith('data:image/png;')){
      // const base64String = signatureData.replace('data:image/png;', '');
      // const base64Url = 'data:image/png;' + base64String;
      const base64String = signatureData.replace('data:image/png;base64,', ''); // Remove 'data:image/png;base64,' prefix
       console.log(base64String);

       this.sign.imageData = base64String
       this.toast = this.toastController
       .create({
         message: "Customer Signature updated",
         duration: 2000,
       })
       .then((toastData) => {
         console.log(toastData);
         toastData.present();
       });
    

  
       var url = "https://jll.digitalworkdesk.com/jll-management/api/capture_customer_signature.php"
       return this.http.post(url , this.sign).subscribe((data)=>{

          console.log(data)
            this.isButtonDisabled_save = true;
  
       }) 
     
    
    }
  }








}







