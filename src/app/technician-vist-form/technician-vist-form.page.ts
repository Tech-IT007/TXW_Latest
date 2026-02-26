import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ToastController, LoadingController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-technician-vist-form',
  templateUrl: './technician-vist-form.page.html',
  styleUrls: ['./technician-vist-form.page.scss'],
})
export class TechnicianVistFormPage implements OnInit {


  private signaturePad!: SignaturePad;

  // ✅ MULTIPLE IMAGE ARRAY
  capturedImages: string[] = [];

  isButtonDisabled = false;
  toast: any;
  id: any;

  data = {
    TicketID: localStorage.getItem('ID'),
    ObservationID: -1,
    TempObservationID: -1,
    CreatedBy: localStorage.getItem("workname"),
    imageData: ""
  };

  data2 = {
    TicketID: localStorage.getItem('ID'),
    ObservationID: -1,
    TempObservationID: "",
    CreatedBy: localStorage.getItem("workname"),
    imageData: ""
  };

  userdetails: any = {
    CreatedBy: localStorage.getItem("workname"),
    TicketID: localStorage.getItem('ID'),
    Category: "civil",
    Priority: "Non Critical",
    Observation: "",
    CompanyRecommendation: "",
    ClientRecommendation: "",
    TempObservationID: localStorage.getItem("temp_ID"),
    SiteVisitID: localStorage.getItem("SiteVisitID"),
  };

  sign = {
    imageData: "",
    SiteVisitID: localStorage.getItem("SiteVisitID"),
  };

  constructor(
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public api: ApiService,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  // ==============================
  // 📸 MULTIPLE IMAGE CAPTURE
  // ==============================
  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const base64Data = image.base64String;
      if (!base64Data) return;

      const preview = 'data:image/jpeg;base64,' + base64Data;

      // ✅ push into array
      this.capturedImages.push(preview);

      // upload image
      this.uploadImage(base64Data);

    } catch (err) {
      console.log(err);
    }
  }

  // ==============================
  // 🚀 IMAGE UPLOAD API
  // ==============================
  uploadImage(imageData: string) {
    this.ngxService.start();

    // first image → create Temp ID
    if (this.data.TempObservationID === -1) {

      this.data.imageData = imageData;

      const url = "https://techxpertindia.in/api/site_visits/post_capture_site_observation_media.php";

      this.http.post(url, { data: this.data }).subscribe((response: any) => {

        this.id = response.TempObservationID;

        this.userdetails.TempObservationID = this.id;
        this.data2.TempObservationID = this.id;

        this.ngxService.stop();
      });

    } else {
      // other images → same temp id
      this.data2.imageData = imageData;

      const url = "https://techxpertindia.in/api/site_visits/post_capture_site_observation_media.php";

      this.http.post(url, { data: this.data2 }).subscribe(() => {
        this.ngxService.stop();
      });
    }
  }

  // ==============================
  // 🗑 REMOVE IMAGE
  // ==============================
  removeImage(index: number) {
    this.capturedImages.splice(index, 1);
  }

  // ==============================
  // ✍ SIGNATURE
  // ==============================
  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    const signatureData = this.signaturePad.toDataURL();

    if (signatureData.startsWith('data:image/png;')) {

      const base64String = signatureData.replace('data:image/png;base64,', '');

      this.sign.imageData = base64String;

      const url = "https://techxpertindia.in/api/site_visits/capture_sv_customer_signature.php";

      this.http.post(url, this.sign).subscribe(() => {
        this.toastController.create({
          message: "Signature saved successfully",
          duration: 2000
        }).then(t => t.present());
      });
    }
  }

  submit() {
    this.ngxService.start();
    if (this.userdetails.Category == "") {

      this.toast = this.toastController
        .create({
          message: "Enter Your Message",
          duration: 2000,
        })
        .then((toastData) => {
          toastData.present();
        });
      this.ngxService.stop();
    }

    else {
      this.ngxService.start();

      var url = "https://techxpertindia.in/api/site_visits/post_submit_site_observation.php";

      return this.http
        .post(url, this.userdetails, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((response) => {
          this.router.navigateByUrl("/techician-all-site-vist-data") 
          this.ngxService.stop();
        });
    }
  }





}
