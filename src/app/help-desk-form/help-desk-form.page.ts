import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-desk-form',
  templateUrl: './help-desk-form.page.html',
  styleUrls: ['./help-desk-form.page.scss'],
})
export class HelpDeskFormPage implements OnInit {

  form: any = {
    name: '',
    mobile: '',
    issue: '',
    image: ''
  };

  previewImage: any;

  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployeeInfo();
  }

  /* ---------------- GET EMPLOYEE DATA ---------------- */

getEmployeeInfo() {

  const body = {
    EmployeeID: localStorage.getItem('EmployeeID')
  };

  this.http.post('https://techxpertindia.in/api/get_employee_info.php', body)
    .subscribe((res: any) => {

      console.log('Employee API Response:', res);

      // Handle both array & object response
      let data;

      if (Array.isArray(res.data)) {
        data = res.data[0];
      } else {
        data = res.data || res;
      }

      this.form.name = data?.Name || '';
      this.form.mobile = data?.ContactNumber || '';

    }, (err) => {
      console.error('Employee API error:', err);
    });

}

  /* ---------------- ACTION SHEET ---------------- */

  async openActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.takePicture(CameraSource.Camera),
        },
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => this.takePicture(CameraSource.Photos),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  /* ---------------- CAMERA ---------------- */

  async takePicture(source: CameraSource) {

    try {

      const photo = await Camera.getPhoto({
        quality: 40,
        resultType: CameraResultType.Base64,
        source,
      });

      const base64 = photo.base64String;

      this.previewImage = 'data:image/jpeg;base64,' + base64;
      this.form.image = base64;

    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  /* ---------------- SUBMIT ---------------- */

  submitForm() {

    if (!this.form.issue) {
      this.showToast('Please enter issue');
      return;
    }

    const body = {
      Name: this.form.name,
      Mobile: this.form.mobile,
      Issue: this.form.issue,
    Attachment: this.form.image,
      CreatedBy: localStorage.getItem('EmployeeID')
    };

    this.http.post(
      'https://techxpertindia.in/api/post_employee_concern.php',
      body
    ).subscribe((res: any) => {

      this.showToast('Submitted successfully');

      // Reset only issue & image
      this.form.issue = '';
      this.form.image = '';
      this.previewImage = null;

    }, (err) => {
      this.showToast('Something went wrong');
    });

    this.router.navigate(['/help-desk']);
  }

  async showToast(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000
    });
    t.present();
  }
}