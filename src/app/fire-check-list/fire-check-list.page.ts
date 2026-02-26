
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-fire-check-list',
  templateUrl: './fire-check-list.page.html',
  styleUrls: ['./fire-check-list.page.scss'],
})
export class FireCheckListPage implements OnInit {

  @ViewChild('signaturePad', {static: true}) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;
  fir_data: any = {}

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
       this.view_firelist()
     }

     button :boolean

    user_id = {
        "TicketID":localStorage.getItem("ID"), 
    }
  userdetails :any = {
    "ProblemReportedByClient": "",
    "Remarks": "",
    "AssetCondition": "",
    "ClientRepresentative": "",
    "ClientRepresentativeContact": "",
    "ClientRepresentativeEmails": "",
    "ClientRepresentativeDesignation": "",
    "Observation": "",
    "ActionTaken":"",
  "FireAlarmControlPanelAccessible": "",
  "ManualPullBoxesAccessible": "",
  "PanelDisplaysAccurateInfo": "",
  "SmokeDetectorVisualCheckClean": "",
  "SmokeDetectorSensitivityCheck": "",
  "FasPanelConnectorsCheck": "",
  "FasPanelBatteryStatus": "",
  "SystemPowerSupplyCheck": "",
  "WiringAndLoopingCheck": "",
  "McpHammerAvailabilityCheck": "",
  "HootersCheck": "",
  "HeatDetectorsCheck": "",
  "BatteryVoltage12vCheck": "",
  "AcVoltage220230vCheck": "",
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
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  sign = {
    "imageData" : "",
    "TicketID":localStorage.getItem("ID"),
    "GeneralServiceReportID":localStorage.getItem("Genral_services_report"),
    "Type":"ppm_tickets"
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
    var url = "https://techxpertindia.in/api/ppm_tickets/post_fas_service_report_v2.php"
    return this.http.post(url , this.userdetails).subscribe((data)=>{
       console.log(data)
       this.Contact = data
       this.Contact = this.Contact.ClientRepresentativeContact   
     this.router.navigateByUrl("ppm-submit-tickets")
    })
  }

EquipmentDetails:any

view_firelist() {
  const url = "https://techxpertindia.in/api/get_fas_service_report_details.php";

  this.http.post(url, this.user_id).subscribe(
    (response: any) => {
      console.log("API Response: ", response);

      // Store full response
      this.fir_data = response;

      // ✅ Safely map API data into userdetails
      if (response) {
        this.userdetails = {
          ...this.userdetails,  // Keep existing structure

          AssetCondition: response.AssetCondition || "",
          EquipmentDetails: response.EquipmentDetails || "",
          SerialNo: response.SerialNo || "",
          Capacity: response.Capacity || "",
          RefrigerantType: response.RefrigerantType || "",
          MakeModel: response.MakeModel || "",
          ProblemReportedByClient: response.ProblemReportedByClient || "",
          Observation: response.Observation || "",
          ActionTaken: response.ActionTaken || "",
          Remarks: response.Remarks || "",
          ClientRepresentative: response.ClientRepresentative || "",
          ClientRepresentativeContact: response.ClientRepresentativeContact || "",
          ClientRepresentativeEmails: response.ClientRepresentativeEmails || "",
          ClientRepresentativeDesignation: response.ClientRepresentativeDesignation || "",

          // ✅ Newly added Fire Alarm Service fields
          FireAlarmControlPanelAccessible: response.FireAlarmControlPanelAccessible || "",
          ManualPullBoxesAccessible: response.ManualPullBoxesAccessible || "",
          PanelDisplaysAccurateInfo: response.PanelDisplaysAccurateInfo || "",
          SmokeDetectorVisualCheckClean: response.SmokeDetectorVisualCheckClean || "",
          SmokeDetectorSensitivityCheck: response.SmokeDetectorSensitivityCheck || "",
          FasPanelConnectorsCheck: response.FasPanelConnectorsCheck || "",
          FasPanelBatteryStatus: response.FasPanelBatteryStatus || "",
          SystemPowerSupplyCheck: response.SystemPowerSupplyCheck || "",
          WiringAndLoopingCheck: response.WiringAndLoopingCheck || "",
          McpHammerAvailabilityCheck: response.McpHammerAvailabilityCheck || "",
          HootersCheck: response.HootersCheck || "",
          HeatDetectorsCheck: response.HeatDetectorsCheck || "",
          BatteryVoltage12vCheck: response.BatteryVoltage12vCheck || "",
          AcVoltage220230vCheck: response.AcVoltage220230vCheck || ""
        };
      }

      // ✅ If EquipmentDetails exists, extract it
      this.EquipmentDetails = response.EquipmentDetails ? response.EquipmentDetails : "";
    },
    (error) => {
      console.error("Error fetching Fire list data:", error);
    }
  );
}






}

















