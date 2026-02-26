
import { Component, ElementRef, OnInit, ViewChild ,Input} from '@angular/core';
import SignaturePad from 'signature_pad';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cctv',
  templateUrl: './cctv.page.html',
  styleUrls: ['./cctv.page.scss'],
})
export class CCTVPage implements OnInit {
  @Input() maxStars = 5; // Default stars
  rating = 0; // Current rating
  stars: number[] = [];

  view_data  :any = {}
  @ViewChild('signaturePad', { static: true }) signaturePadElement!: ElementRef<HTMLCanvasElement>;
  private signaturePad: SignaturePad;
  isButtonDisabled_save: boolean;
  clint_data: any = {}
  Contact: any;
  ReportedByClient: any;
  ClientRepresentative: any;
  Observation: any;
  ActionTaken: any;

  constructor(public router: Router,
    public http: HttpClient, public toastController: ToastController,) {
   this.stars = Array(this.maxStars).fill(0);
  this.cctv_datashow ()
  }

  button: boolean

  user_id = {
    "TicketID": localStorage.getItem("ID"),
  }
  userdetails: any = {
    "ProblemReportedByClient": "",
    "Remarks": "",
    "AssetCondition": "",
    "ClientRepresentative": "",
    "ClientRepresentativeContact": "",
    "ClientRepresentativeEmails": "",
    "ClientRepresentativeDesignation": "",
    "Observation": "",
    "ActionTaken":"",
     "CheckFunctionalityOfDvrNvr": "",
  "CheckFunctionalityOfIndoorCameras": "",
  "CheckFunctionalityOfOutdoorCameras": "",
  "CheckPowerSupplyOfSystem": "",
  "CheckWiringAndConnectivity": "",
  "CheckHddFunctionality": "",
  "CheckQualityForFocusOfCamera": "",
  "CheckMouseAvailability": "",
  "CheckFunctioningOfPoeSwitch": "",
  "CheckConditionOfBncRj45Connectors": "",
  "CleaningOfCameraIfRequired": "",
  "CheckTotalCountOfCameras": "",
  "CheckSurroundingsExternalInternal": "",

    "EquipmentDetails":"",
    "SerialNo":"",
    "Capacity":"",
    "RefrigerantType":"",
     "MakeModel":"",
    "AttendedBy": "admin",
    "CreatedBy": "admin",
        "ServiceReportID": localStorage.getItem("Genral_services_report"),
    "ServiceReportTicketID": localStorage.getItem("ID"),
    "Latitude": localStorage.getItem("latitude"),
    "Longitude": localStorage.getItem("longitude")
  };
  toast: any;

  hidd_pad: boolean = true;
  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.cctv_datashow ()
  }
hvac_data = {
   "TicketID": localStorage.getItem("ID"),
}

  sign = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "GeneralServiceReportID": localStorage.getItem("Genral_services_report"),
    "Type" : "ppm_tickets"
  }
  clearSignature() {
    this.signaturePad.clear();
    this.isButtonDisabled_save = false;
  }
 setRating(value: number) {
    this.rating = value;
  }

  goBack() {
    this.router.navigateByUrl("/ppm-submit-tickets")

  }
  saveSignature() {


    this.hidd_pad = false;
    const signatureData = this.signaturePad.toDataURL();

    if (signatureData.startsWith('data:image/png;')) {
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
      return this.http.post(url, this.sign).subscribe((data) => {

        console.log(data)
        this.button = true;


      })


    }
  }

  submit() {

    var url = "https://techxpertindia.in/api/ppm_tickets/post_cctv_service_report.php"
    return this.http.post(url, this.userdetails).subscribe((data) => {
      console.log(data)
      this.Contact = data
      this.Contact = this.Contact.ClientRepresentativeContact


      this.router.navigateByUrl("ppm-submit-tickets")
    })
  }


cctv_datashow() {
  const url = "https://techxpertindia.in/api/get_cctv_service_report_details.php";

  this.http.post(url, this.hvac_data).subscribe(
    (response: any) => {
      console.log("CCTV API Response:", response);

      // ✅ Store raw API response
      this.view_data = response;

      // ✅ Map response into userdetails safely
      if (response) {
        this.userdetails = {
          ...this.userdetails, // keep existing defaults

          AssetCondition: response.AssetCondition || "",
          CheckFunctionalityOfDvrNvr: response.CheckFunctionalityOfDvrNvr || "",
          CheckFunctionalityOfIndoorCameras: response.CheckFunctionalityOfIndoorCameras || "",
          CheckFunctionalityOfOutdoorCameras: response.CheckFunctionalityOfOutdoorCameras || "",
          CheckPowerSupplyOfSystem: response.CheckPowerSupplyOfSystem || "",
          CheckWiringAndConnectivity: response.CheckWiringAndConnectivity || "",
          CheckHddFunctionality: response.CheckHddFunctionality || "",
          CheckQualityForFocusOfCamera: response.CheckQualityForFocusOfCamera || "",
          CheckMouseAvailability: response.CheckMouseAvailability || "",
          CheckFunctioningOfPoeSwitch: response.CheckFunctioningOfPoeSwitch || "",
          CheckConditionOfBncRj45Connectors: response.CheckConditionOfBncRj45Connectors || "",
          CleaningOfCameraIfRequired: response.CleaningOfCameraIfRequired || "",
          CheckTotalCountOfCameras: response.CheckTotalCountOfCameras || "",
          CheckSurroundingsExternalInternal: response.CheckSurroundingsExternalInternal || "",

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
      console.error("CCTV API Error:", error);
    }
  );
}

}




























