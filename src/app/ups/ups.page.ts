
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ups',
  templateUrl: './ups.page.html',
  styleUrls: ['./ups.page.scss'],
})
export class UPSPage implements OnInit {

  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;
  ProblemReportedByClient: Object;

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
          
      
     }

     button :boolean

    user_id = {
        "TicketID":localStorage.getItem("ID"), 
    }
  userdetails = {
   "ProblemReportedByClient": "",
    "Remarks": "",
    "AssetCondition": "",
    "ClientRepresentative": "",
    "ClientRepresentativeContact": "",
    "ClientRepresentativeEmails": "",
    "ClientRepresentativeDesignation": "",
    "Observation": "",
    "ActionTaken":"",
  "CheckLooseConnection": "",
  "CheckCleaning": "",
  "CheckChargingStatus": "",
  "CheckBypassSwitch": "",
  "CheckWireColorChange": "",
  "CheckBatteryTerminals": "",
  "CheckBatteryVoltage": "",
  "CheckIRValue": "",
  "CheckEarthingVoltage": "",
  "CheckOutputVoltage": "",
  "CheckChargingVoltage": "",
  "CheckCurrentLoad": "",

  "IRValue": "",
  "EarthingVoltage": "",
  "OutputVoltage": "",
  "ChargingVoltage": "",
  "CurrentLoad": "",


    "EquipmentDetails":"",
    "SerialNo":"",
    "Capacity":"",
    "RefrigerantType":"",
     "MakeModel":"",
    "AttendedBy": "admin",


    "ServiceReportID":localStorage.getItem("Genral_services_report"),
    "ServiceReportTicketID": localStorage.getItem("ID"),
    "CreatedBy":"admin",
    "Latitude": localStorage.getItem("latitude"),
    "Longitude": localStorage.getItem("longitude")
  };
  toast: any;

  hidd_pad:boolean = true;
  ngOnInit() {
    this.new_ups()
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


  goBack(){
    this.router.navigateByUrl("/ppm-submit-tickets")  
  
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

    var url = "https://techxpertindia.in/api/ppm_tickets/post_ups_service_report.php"
    return this.http.post(url , this.userdetails).subscribe((data)=>{
       console.log(data)
       this.Contact = data
       this.Contact = this.Contact.ClientRepresentativeContact
     
       
     this.router.navigateByUrl("ppm-submit-tickets")
    })
  }


new_ups() {
  const api = "https://techxpertindia.in/api/get_ups_service_report_details.php";

  this.http.post(api, this.user_id).subscribe(
    (response: any) => {
      console.log("UPS API Response:", response);

      // ✅ Store full response
      this.clint_data = response;

      // ✅ Safely map API response into userdetails
      if (response) {
        this.userdetails = {
          ...this.userdetails,  // Keep existing values if any

          AssetCondition: response.AssetCondition || "",
          CheckLooseConnection: response.CheckLooseConnection || "",
          CheckCleaning: response.CheckCleaning || "",
          CheckChargingStatus: response.CheckChargingStatus || "",
          CheckBypassSwitch: response.CheckBypassSwitch || "",
          CheckWireColorChange: response.CheckWireColorChange || "",
          CheckBatteryTerminals: response.CheckBatteryTerminals || "",
          CheckBatteryVoltage: response.CheckBatteryVoltage || "",
          CheckIRValue: response.CheckIRValue || "",
          CheckEarthingVoltage: response.CheckEarthingVoltage || "",
          CheckOutputVoltage: response.CheckOutputVoltage || "",
          CheckChargingVoltage: response.CheckChargingVoltage || "",
          CheckCurrentLoad: response.CheckCurrentLoad || "",

          IRValue: response.IRValue || "",
          EarthingVoltage: response.EarthingVoltage || "",
          OutputVoltage: response.OutputVoltage || "",
          ChargingVoltage: response.ChargingVoltage || "",
          CurrentLoad: response.CurrentLoad || "",

          ProblemReportedByClient: response.ProblemReportedByClient || "",
          Observation: response.Observation || "",
          ActionTaken: response.ActionTaken || "",
          Remarks: response.Remarks || "",

          ClientRepresentative: response.ClientRepresentative || "",
          ClientRepresentativeContact: response.ClientRepresentativeContact || "",
          ClientRepresentativeEmails: response.ClientRepresentativeEmails || "",
          ClientRepresentativeDesignation: response.ClientRepresentativeDesignation || "",

          EquipmentDetails: response.EquipmentDetails || "",
          SerialNo: response.SerialNo || "",
          Capacity: response.Capacity || "",
          RefrigerantType: response.RefrigerantType || "",
          MakeModel: response.MakeModel || ""
        };
      }
    },
    (error) => {
      console.error("UPS API Error:", error);
    }
  );
}

}


