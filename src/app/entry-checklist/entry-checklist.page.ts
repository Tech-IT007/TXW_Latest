import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-entry-checklist',
  templateUrl: './entry-checklist.page.html',
  styleUrls: ['./entry-checklist.page.scss'],
})
export class EntryChecklistPage implements OnInit {

  OTP_Genrate = {
    "TicketID": localStorage.getItem("CameraID"),
    "TicketStatus": "Generate OTP to Start",
    "UpdatedBy": localStorage.getItem("workname"),
    "AssignedTo": localStorage.getItem("empl_ID"),
    "DueDate": ""
  }
  url = "https://techxpertindia.in/api/change_ticket_status.php";
  apiChecklistUrl = 'https://techxpertindia.in/api/technician-safety-checks.php';
  apiUploadUrl = "https://techxpertindia.in/api/get_capture_image.php"

  // Checklist fields configuration
  checklistFields = [
    { key: 'Is_Uniform', label: 'Are you wearing the company uniform?' },
    { key: 'Has_Jacket', label: 'Are you wearing your safety jacket?' },
    { key: 'Has_Toolkit_Isolated', label: 'Do you have your insulated toolkit?' },
    { key: 'Has_Safety_Shoes', label: 'Are you wearing approved safety shoes?' },
    { key: 'Has_Ppe_Kit', label: 'Do you have your full PPE kit available?' }
  ];

  userdetails: any = {
    TicketID: localStorage.getItem("CameraID"),
    Is_Uniform: '',
    Has_Jacket: '',
    Has_Toolkit_Isolated: '',
    Has_Safety_Shoes: '',
    Has_Ppe_Kit: ''
  };

  user_data = {
    imageData: "",
    TicketID: localStorage.getItem("CameraID"),
    Action: ""
  }

  images: any = {};
  phoneNumber: any;
  accountBranchNo: any;
  accountBranchManager: any;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
  ) { }

  /** Handle YES/NO selection */
  async onChoice(field: string, value: string) {
    this.userdetails[field] = value;

    if (value === 'YES') {
      await this.captureImage(field);
    } else {
      this.images[field] = '';
    }
  }

async captureImage(field: string) {
  try {
    const photo = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,                 // No cropping
      resultType: CameraResultType.Base64, // Base64 output
      source: CameraSource.Camera,         // Open camera
      direction: CameraDirection.Front,    // FRONT camera
      saveToGallery: false
    });

    // Base64 (no prefix)
    const cleanBase64 = photo.base64String || '';

    // Preview in UI
    this.images[field] = 'data:image/jpeg;base64,' + cleanBase64;

    // Prepare data for API
    this.user_data.imageData = cleanBase64;
    this.user_data.Action = field;

    const payload = { data: this.user_data };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.apiUploadUrl, payload, { headers }).subscribe(
      (data) => {
        console.log('Image uploaded:', data);
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );

  } catch (error) {
    // Camera cancelled case
    this.userdetails[field] = 'NO';
    this.images[field] = '';
    this.showToast('⚠️ Camera cancelled');
    console.error('Camera error:', error);
  }
}


  /** Submit checklist */
 async submitChecklist() {
  try {
    // ✅ 1. Validate checklist fields
    for (let field of this.checklistFields) {
      if (!this.userdetails[field.key]) {
        await this.showToast(`⚠️ Please select "${field.label}"`);
        return;
      }
    }

    // ✅ 2. Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Submitting checklist...',
      spinner: 'crescent',
      backdropDismiss: false
    });
    await loading.present();

    // ✅ 3. Prepare request payload
    const payload = {
      TicketID: this.userdetails.TicketID || '',
      ...this.userdetails
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // ✅ 4. Call checklist API
    const checklistResponse: any = await this.http
      .post(this.apiChecklistUrl, payload).subscribe((response=>{
        console.log(response)
      }))




    // ✅ 6. Show success toast
    await this.showToast('✅ Checklist submitted successfully');

    // ✅ 7. Change ticket status
  return this.http.post(this.url, this.OTP_Genrate).subscribe((res: any) => {
  console.log("phone_testing", res);

  // Extract phone number
  this.phoneNumber = res.phonenumber;
  console.log("phone_testing_final", this.phoneNumber);

  // Extract branch details from array
  this.accountBranchNo = res.phonenumber[0];
  console.log("accountBranchNo", this.accountBranchNo);

  // Extract manager number
  this.accountBranchManager = res.phonenumber[1];
  console.log("accountBranchManager", this.accountBranchManager);

  // Save both to localStorage
  // localStorage.setItem('phoneNumber', this.phoneNumber);
  localStorage.setItem('accountBranchNo', this.accountBranchNo);
  localStorage.setItem('accountBranchManager', this.accountBranchManager);

  // Navigate to OTP page
  this.router.navigateByUrl('/verfication-otp');
   loading.dismiss();
});

      
  

    // ✅ 8. Dismiss loader

  } catch (error) {
    console.error('Submit Checklist Error:', error);

    // ✅ Ensure loader is dismissed even on error
    const topLoader = await this.loadingController.getTop();
    if (topLoader) await topLoader.dismiss();

    await this.showToast('⚠️ Something went wrong. Please try again.');
  }
}



  /** Show toast message */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top'
    });
    toast.present();


  }

  ngOnInit() { }
}
