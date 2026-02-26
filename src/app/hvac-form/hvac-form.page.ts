import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hvac-form',
  templateUrl: './hvac-form.page.html',
  styleUrls: ['./hvac-form.page.scss'],
})
export class HVACFormPage implements OnInit {
  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
          
     }

     button :boolean

    user_id = {
        "TicketID":localStorage.getItem("ID"), 
    }
  userdetails = {
    "ProblemReportedByClient":"",
    "Remarks":"",
    "Condition":"",
    "ClientRepresentative":"",
    "ClientRepresentativeContact":"",
    "ClientRepresentativeEmails":"",
    "ClientRepresentativeDesignation":"",
    "Observation":"",
    "GrillTemperature":"",
    "AmbientTemperature":"",
    "RoomTemperature":"",
    "IndoorFan":"",
    "ReturnAirTemperature":"",
    "SupplyAirTemperature":"",
    "Compressor":"",
    "Voltage":"",
    "TotalCurrent":"",
    "OutdoorFan":"",
    "CompressorSuction":"",
    "CompressorDischarge":"",
    "ActionTaken":"",
     "CondenserAirInlet":"",
     "CondenserAirOutlet":"",
    "ServiceReportID":localStorage.getItem("Genral_services_report"),
    "ServiceReportTicketID": localStorage.getItem("ID"),
    "CreatedBy":"admin",
    "Latitude": localStorage.getItem("latitude"),
    "Longitude": localStorage.getItem("longitude")
  };
  toast: any;

  hidd_pad:boolean = true;
  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  sign = {
    "imageData" : "",
    "TicketID":localStorage.getItem("ID"),
    "GeneralServiceReportID":localStorage.getItem("Genral_services_report"),
      "Type" : "ppm_tickets"
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
    

  
       var url = "https://techxpertindia.in/api/capture_customer_signature.php"
       return this.http.post(url , this.sign).subscribe((data)=>{

          console.log(data)
            this.button = true;
          

       }) 
     
    
    }
  }

  submit (){

    var url = "https://techxpertindia.in/api/post_hvac_ticket_details.php"
    return this.http.post(url , this.userdetails).subscribe((data)=>{
       console.log(data)
       this.Contact = data
       this.Contact = this.Contact.ClientRepresentativeContact
     
       
     this.router.navigateByUrl("technician")
    })
  }


}




