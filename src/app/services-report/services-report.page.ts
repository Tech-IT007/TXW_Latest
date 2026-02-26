import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
@Component({
  selector: 'app-services-report',
  templateUrl: './services-report.page.html',
  styleUrls: ['./services-report.page.scss'],
})
export class ServicesReportPage implements OnInit {
  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;
  feedback: boolean;
  not_submit: boolean = true;
soundLoaded = false;
  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,  private loadingController: LoadingController,
      private nativeAudio: NativeAudio,
  private alertCtrl: AlertController,
  private platform: Platform
  ) {
          
          this.all_services_report()
     }

     button :boolean

    user_id = {
        "TicketID":localStorage.getItem("ID"), 
    }

  userdetails = {
    "ProblemReportedByClient":"",
    "Observation":"",
    "ActionTaken":"",
    "Remarks":"",
    "ClientRepresentative":"",
    "ClientRepresentativeContact":"",
    "ClientRepresentativeEmails":"",
    "ClientRepresentativeDesignation":"",
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

submit() {

  const url = "https://techxpertindia.in/api/post_general_service_report.php";

  this.http.post(url, this.userdetails).subscribe({

    next: async (data: any) => {

      console.log(data);

      // 🔔 sound + message
      await this.showInAppMessage();

      // ⏭ redirect after alert
      setTimeout(() => {
        this.router.navigateByUrl('technician');
      }, 1500);
    },

    error: () => {
      console.log('API failed');
    }

  });
}


all_services_report(){
  var url = "https://techxpertindia.in/api/get_general_service_report_details.php"
  return this.http.post(url , this.user_id).subscribe((data)=>{
     console.log(data)  
     this.Contact = data 
     this.Contact = this.Contact.ClientRepresentativeContact
     this.userdetails.ClientRepresentativeContact = this.Contact
     this.ReportedByClient = data
     this.ReportedByClient = this.ReportedByClient.ProblemReportedByClient
     this.userdetails.ProblemReportedByClient = this.ReportedByClient
     this.ClientRepresentative =  data
     this.ClientRepresentative = this.ClientRepresentative.ClientRepresentative
     this.userdetails.ClientRepresentative = this.ClientRepresentative
     this.Observation = data
     this.Observation = this.Observation.Observation
      this.userdetails.Observation = this.Observation
      this.ActionTaken = data
      this.ActionTaken = this.ActionTaken.ActionTaken
      this.userdetails.ActionTaken = this.ActionTaken
     this.clint_data = data;
     console.log(this.clint_data)
  })
}

async showInAppMessage() {

  // 🔒 run only on device
  if (!this.platform.is('cordova')) {
    console.log('Sound works only on mobile device');
    return;
  }

  try {

    // 🔊 preload only once
    if (!this.soundLoaded) {
      await this.nativeAudio.preloadSimple(
        'notif',
        'assets/sounds/notification.mp3'
      );
      this.soundLoaded = true;
    }

    // 🔔 play every time
    this.nativeAudio.play('notif');

    // 📢 show message
    const alert = await this.alertCtrl.create({
      header: 'Notification',
      message: 'Your details submitted successfully.',
      buttons: ['OK']
    });

    await alert.present();

  } catch (err) {
    console.log('Audio error:', err);
  }
}

}


