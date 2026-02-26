
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.page.html',
  styleUrls: ['./panels.page.scss'],
})
export class PanelsPage implements OnInit {

  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;
  hvac_report: any = {}

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
       this.eltical_pannnal ()  
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
  "RemoveDustFromPanel": "",
  "CheckIndicationLamps": "",
  "CheckVoltmeterAmmeter": "",
  "CheckSelectorSwitches": "",
  "CorrectLooseConnection": "",
  "CheckTPN":"",
  "RemoveSignboard": "",
  "EnsureNoToolsLeft": "",
  "ApplyLockTagNotice": "",
  "PersonalProtectiveEmergency": "",
  "WasteClothes": "",
  "RustCleaningAgent": "",
  "Multimeter": "",
  "ToolSet": "",
  "EarthingResistance": "",
  "Frequency": "",
  "Current": "",
  "PowerFactor": "",
  "Supply1PhaseVoltage": "",
  "Supply3PhaseVoltage": "",
  "EquipmentDetails": "",
  "SerialNo": "",
  "Capacity": "",
  "RefrigerantType": "",
  "pasat_data":"",
  "MakeModel": "",
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
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  sign = {
    "imageData" : "",
    "TicketID":localStorage.getItem("ID"),
     "Type":"ppm_tickets",
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

  submit (){

    var url = "https://techxpertindia.in/api/ppm_tickets/post_ep_service_report.php"
    return this.http.post(url , this.userdetails).subscribe((data)=>{
       console.log(data)
       this.Contact = data
       this.Contact = this.Contact.ClientRepresentativeContact
     
       this.router.navigateByUrl("/ppm-submit-tickets")
    })
  }


goBack() {
    this.router.navigateByUrl("/ppm-submit-tickets")
  }


eltical_pannnal() {
  const api = "https://techxpertindia.in/api/get_ep_service_report_details.php";

  this.http.post(api, this.user_id).subscribe(
    (response: any) => {
      console.log("Electrical Panel API Response:", response);

      if (response) {
        this.userdetails = {
          ...this.userdetails, // keep existing defaults

          AssetCondition: response.AssetCondition || "",
          RemoveDustFromPanel: response.RemoveDustFromPanel || "",
          CheckIndicationLamps: response.CheckIndicationLamps || "",
          CheckVoltmeterAmmeter: response.CheckVoltmeterAmmeter || "",
          CheckSelectorSwitches: response.CheckSelectorSwitches || "",
          CorrectLooseConnection: response.CorrectLooseConnection || "",
          CheckTPN: response.CheckTPN || "",
          RemoveSignboard: response.RemoveSignboard || "",
          EnsureNoToolsLeft: response.EnsureNoToolsLeft || "",
          ApplyLockTagNotice: response.ApplyLockTagNotice || "",
          PersonalProtectiveEmergency: response.PersonalProtectiveEmergency || "",
          WasteClothes: response.WasteClothes || "",
          RustCleaningAgent: response.RustCleaningAgent || "",
          Multimeter: response.Multimeter || "",
          ToolSet: response.ToolSet || "",
          EarthingResistance: response.EarthingResistance || "",
          Frequency: response.Frequency || "",
          Current: response.Current || "",
          PowerFactor: response.PowerFactor || "",
          Supply1PhaseVoltage: response.Supply1PhaseVoltage || "",
          Supply3PhaseVoltage: response.Supply3PhaseVoltage || "",

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

  );
}

}













































