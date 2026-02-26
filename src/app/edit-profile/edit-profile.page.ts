import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  clickedImage: string;
  impact: any = {};        // API response data
  users: any;
edit_profile = {
  EmployeeID : localStorage.getItem('EmployeeID'),
  imageData : ''
}
  dataToSend = {
    EmployeeID: localStorage.getItem('EmployeeID'),
  };

UpdateProfile: any = {
  EmployeeID: localStorage.getItem('EmployeeID'),

  // BASIC DETAILS
  employee_name: '',
  employee_email: '',
  personal_email: '',
  employee_contact: '',
  gender: '',
  father_name: '',
  city: '',
  state: '',

  // GOVT DETAILS
  employee_aadhar_number: '',
  employee_pan_number: '',
 UANNumber: '',
  epf_number: '',
  esic_number: '',

  // BANK DETAILS
  bank_account_name: '',
  bank_account_number: '',

  // JOB DETAILS
  department: '',
  designation: '',
  division: '',
  supervisor: '',
  date_of_joining: '',
  weekly_off: '',

  // SALARY DETAILS
  basic_salary: '',
  hra: '',
  da: '',
  bonus: '',
  others: '',
  convenience_allowance: '',
  inhand_salary: '',

  // MEDIA
  profile_image: '',
  aadhar_image: '',
  pan_image: '',
  police_verification_image: ''
};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private ngxService: NgxUiLoaderService,
    private actionSheetCtrl: ActionSheetController,
  
  ) {}

  // =============================
  // LIFECYCLE
  // =============================
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.userId) {
        this.dataToSend.EmployeeID = params.userId;
      }
      this.getEmployeeDetails();
    });
  }

  // =============================
  // GET EMPLOYEE DATA
  // =============================
  getEmployeeDetails() {
    this.ngxService.start();

    const url = 'https://techxpertindia.in/api/get_employee_info.php';

    this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (res: any) => {
          this.ngxService.stop();

          this.impact = res?.data || {};

          // 🔥 IMPORTANT: Assign values to ngModel object
 
// BASIC
this.UpdateProfile.employee_name = this.impact.Name || '';
this.UpdateProfile.employee_email = this.impact.Email || '';
this.UpdateProfile.personal_email = this.impact.PersonalEmail || '';
this.UpdateProfile.employee_contact = this.impact.ContactNumber || '';
this.UpdateProfile.gender = this.impact.Gender || '';
this.UpdateProfile.father_name = this.impact.FatherName || '';
this.UpdateProfile.city = this.impact.City || '';
this.UpdateProfile.state = this.impact.State || '';

// GOVT
this.UpdateProfile.employee_aadhar_number = this.impact.Aadhar || '';
this.UpdateProfile.employee_pan_number = this.impact.PAN || '';
this.UpdateProfile.UANNumber = this.impact.UANNumber || '';
this.UpdateProfile.epf_number = this.impact.Epf_number || '';
this.UpdateProfile.esic_number = this.impact.Esic_number || '';

// BANK
this.UpdateProfile.BankAccountNumber= this.impact.BankAccountNumber|| '';
this.UpdateProfile.bank_account_number = this.impact.BankAccountNumber || '';

// JOB
this.UpdateProfile.department = this.impact.Department || '';
this.UpdateProfile.designation = this.impact.Designation || '';
this.UpdateProfile.division = this.impact.Division || '';
this.UpdateProfile.supervisor = this.impact.Supervisor || '';
this.UpdateProfile.date_of_joining = this.impact.DateofJoining || '';
this.UpdateProfile.weekly_off = this.impact.WeeklyOff || '';

// SALARY
this.UpdateProfile.basic_salary = this.impact.Basic || '';
this.UpdateProfile.hra = this.impact.HRA || '';
this.UpdateProfile.da = this.impact.DA || '';
this.UpdateProfile.bonus = this.impact.Bonus || '';
this.UpdateProfile.others = this.impact.Others || '';
this.UpdateProfile.convenience_allowance = this.impact.ConvenienceAllowance || '';
this.UpdateProfile.inhand_salary = this.impact.InHandSalary || '';

// MEDIA
this.UpdateProfile.profile_image = this.impact.ProfileImage || '';
this.UpdateProfile.aadhar_image = this.impact.AadharImage || '';
this.UpdateProfile.pan_image = this.impact.PANImage || '';


        },
        error: (err) => {
          this.ngxService.stop();
          this.presentToast('Failed to load profile', 'danger');
          console.error(err);
        },
      });
  }

  // =============================
  // SUBMIT PROFILE
  // =============================
  submit() {
    const url = 'https://techxpertindia.in/api/update_tx_customer_details.php';

    this.ngxService.start();

    this.http
      .post(url, this.UpdateProfile, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (res: any) => {
          this.ngxService.stop();
          this.presentToast('Profile updated successfully', 'success');
          this.router.navigate(['/information']);
        },
        error: (err) => {
          this.ngxService.stop();
          this.presentToast('Update failed', 'danger');
          console.error(err);
        },
      });
  }

  // =============================
  // TOAST
  // =============================
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }



async captureImage() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons: [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.takePicture1(CameraSource.Camera),
      },
      {
        text: 'Choose from Gallery',
        icon: 'image',
        handler: () => this.takePicture1(CameraSource.Photos),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });
  await actionSheet.present();
}

async takePicture1(source: CameraSource) {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source,
    });

    const cleanBase64 = photo.base64String;
    this.saveImageToDataStore(cleanBase64);
    this.clickedImage = 'data:image/jpeg;base64,' + cleanBase64;
  } catch (err) {
    console.log('Camera error:', err);
  }
}

saveImageToDataStore(imageData: string) {
  this.ngxService.start();
  this.edit_profile.imageData  = imageData;

  const url = "https://techxpertindia.in/api/update_employee_profile_image.php";

  this.http.post(url,this.edit_profile).subscribe({
    next: (data: any) => {
      console.log(data);
            this.router.navigate(['/vendor-new-page']);
    },
    error: (error) => console.error('Error saving image:', error),
  
    complete: () => this.ngxService.stop(),
 
  });
}

}
