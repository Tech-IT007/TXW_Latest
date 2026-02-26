import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-visitor-summary',
  templateUrl: './visitor-summary.page.html',
  styleUrls: ['./visitor-summary.page.scss'],
})
export class VisitorSummaryPage implements OnInit {
  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;
  button: boolean;
  constructor( private http : HttpClient , public toastController: ToastController, public router :Router) { }
  toast :any
  hidd_pad:boolean = true;
  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  sign = {
    "imageData" : "",
"SiteVisitID":localStorage.getItem("SummaryID"),
  }
  clearSignature() {
    this.signaturePad.clear();
   this.isButtonDisabled_save = false;
  }

  user_details = {
    "SiteVisitID":localStorage.getItem("SummaryID"),
    "Summary":"",
    "CreatedBy":localStorage.getItem("workname"),
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
    

  
       var url = "https://techxpertindia.in/api/site_visits/capture_sv_customer_signature.php"

       return this.http.post(url , this.sign).subscribe((data)=>{

          console.log(data)
            this.button = true;
          

       }) 
     
    
    }
  }

  summery (){
    var api = "https://techxpertindia.in/api/site_visits/complete_site_visit.php"
    return this.http.post(api,this.user_details).subscribe((data)=>{
      console.log(data)

      this.router.navigateByUrl("/visitor-all-tickets")
    })
  }

}
