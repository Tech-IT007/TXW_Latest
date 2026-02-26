
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-havc',
  templateUrl: './new-havc.page.html',
  styleUrls: ['./new-havc.page.scss'],
})
export class NewHavcPage implements OnInit {
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
  view_data: any = {}
  AssetCondition: any;

  constructor(public router : Router,
    public http : HttpClient , public toastController: ToastController,) {
         
     }

     button :boolean

    user_id = {
        "TicketID":localStorage.getItem("ID"), 
       
    }
    hvac_data = {
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
  "GrillTemperature": "",
  "AmbientTemperature": "",
  "RoomTemperature": "",
  "IndoorFan": "",
  "ReturnAirTemperature": "",
  "SupplyAirTemperature": "",
  "Compressor": "",
  "Voltage": "",
    "SupplyVoltage": "",
  "TotalCurrent": "",
  "OutdoorFan": "",
  "CompressorSuction": "",
  "CompressorDischarge": "",
  "CondenserAirInlet": "",
  "CondenserAirOutlet": "",
  "CoolingCoilCleaningCondition": "",
  "DrainPumpWorkingCondition": "",
  "DrainTrayCondition": "",
  "FanMotorCondition": "",
  "FilterCleaningCondition": "",
  "PCBPhysicalWorkingCondition": "",
  "CoolingLossPreventionCondition": "",
  "CondesnorCoilConditionCleaning": "",
  "CompressorWorkingCondition": "",
  "OutdoorInstallationCondition": "",
  "FanMotorWorkingCondition": "",
  "ElectricalTerminalCondition": "",
  "SurroundingConditionsToWork": "",
  "AFrequency": "",
  "AmbientAirTemperature": "",
  "CompressorSuctionPressure": "",
  "DischargePressuret": "",
  "CompressorCurrent": "",
  "IndoorFanMotorCurrent": "",
  "OutdoorFanMotorCurrent": "",
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
    this.hvac_datashow()
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

    var url = "https://techxpertindia.in/api/ppm_tickets/post_hvac_service_report.php"
    return this.http.post(url , this.userdetails).subscribe((data)=>{
       console.log(data)
       this.Contact = data
   
     
       this.router.navigateByUrl("/ppm-submit-tickets")
    })
  }



goBack() {
    this.router.navigateByUrl("/ppm-submit-tickets")
  }

hvac_datashow() {
  const url = "https://techxpertindia.in/api/get_hvac_service_report_details.php";

  this.http.post(url, this.hvac_data).subscribe(
    (response: any) => {

      this.view_data =  response
 
      console.log("HVAC API Response: ", response);

      // ✅ Store full API response
      this.view_data = response;

      // ✅ Safely map API response into userdetails
      if (response) {
        this.userdetails = {
          ...this.userdetails,  // Keep existing data

          AssetCondition: response.AssetCondition || "",
          GrillTemperature: response.GrillTemperature || "",
          AmbientTemperature: response.AmbientTemperature || "",
          RoomTemperature: response.RoomTemperature || "",
          IndoorFan: response.IndoorFan || "",
          ReturnAirTemperature: response.ReturnAirTemperature || "",
          SupplyAirTemperature: response.SupplyAirTemperature || "",
          Compressor: response.Compressor || "",
          Voltage: response.Voltage || "",
          SupplyVoltage: response.SupplyVoltage || "",
          TotalCurrent: response.TotalCurrent || "",
          OutdoorFan: response.OutdoorFan || "",
          CompressorSuction: response.CompressorSuction || "",
          CompressorDischarge: response.CompressorDischarge || "",
          CondenserAirInlet: response.CondenserAirInlet || "",
          CondenserAirOutlet: response.CondenserAirOutlet || "",
          CoolingCoilCleaningCondition: response.CoolingCoilCleaningCondition || "",
          DrainPumpWorkingCondition: response.DrainPumpWorkingCondition || "",
          DrainTrayCondition: response.DrainTrayCondition || "",
          FanMotorCondition: response.FanMotorCondition || "",
          FilterCleaningCondition: response.FilterCleaningCondition || "",
          PCBPhysicalWorkingCondition: response.PCBPhysicalWorkingCondition || "",
          CoolingLossPreventionCondition: response.CoolingLossPreventionCondition || "",
          CondesnorCoilConditionCleaning: response.CondesnorCoilConditionCleaning || "",
          CompressorWorkingCondition: response.CompressorWorkingCondition || "",
          OutdoorInstallationCondition: response.OutdoorInstallationCondition || "",
          FanMotorWorkingCondition: response.FanMotorWorkingCondition || "",
          ElectricalTerminalCondition: response.ElectricalTerminalCondition || "",
          SurroundingConditionsToWork: response.SurroundingConditionsToWork || "",
          AFrequency: response.AFrequency || "",
          AmbientAirTemperature: response.AmbientAirTemperature || "",
          CompressorSuctionPressure: response.CompressorSuctionPressure || "",
          DischargePressuret: response.DischargePressuret || "",
          CompressorCurrent: response.CompressorCurrent || "",
          IndoorFanMotorCurrent: response.IndoorFanMotorCurrent || "",
          OutdoorFanMotorCurrent: response.OutdoorFanMotorCurrent || "",

          // ✅ Client & Equipment Details
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
          ClientRepresentativeDesignation: response.ClientRepresentativeDesignation || ""
        };
      }

      // ✅ For quick access
      this.AssetCondition = response.AssetCondition || "";
    },

  );
}

}
































