import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dpr-form',
  templateUrl: './dpr-form.page.html',
  styleUrls: ['./dpr-form.page.scss'],
})
export class DprFormPage implements OnInit {

  userdetails = {
    Status: 0,            // final total percent that will be sent to server
    Remarks: '',
    TaskProgressID: localStorage.getItem('TaskProgressID'),
    TaskID: localStorage.getItem('TaskID'),
    TaskDate: localStorage.getItem('TaskDate'),
    TicketID : localStorage.getItem("ID")
  };

  camera_user_details = {
    imageData: '',
    TaskProgressID: localStorage.getItem('TaskProgressID'),
    TaskID: localStorage.getItem('TaskID'),
    TaskDate: localStorage.getItem('TaskDate'),
  };

  update_userdetais = {
    ID: localStorage.getItem('TaskProgressID'),
  };

  capturedImage: any = '';
  task_date: any;

  // saved past progress (e.g. 30)
  previousProgress = 0;

  // this slider represents **additional** progress the user will add (0 .. maxAdditional)
  additionalProgress = 0;
  maxAdditional = 100; // = 100 - previousProgress

  isLoaded = false; // show slider only after we initialize

  constructor(

    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.task_date = localStorage.getItem('TaskDate');

    // 1) load saved progress (localStorage) as baseline
    const stored = localStorage.getItem('TaskProgress');
    const storedValue = stored ? Number(stored) : 0;
    this.previousProgress = isNaN(storedValue) ? 0 : Math.max(0, Math.min(100, storedValue));

    // compute max additional allowed so total never exceeds 100
    this.maxAdditional = Math.max(0, 100 - this.previousProgress);

    // keep additionalProgress default at 0 (user will move forward)
    this.additionalProgress = 0;

    // mark UI ready
    this.isLoaded = true;

    // 2) also fetch latest server value to ensure we don't regress
    this.loadPreviousData();
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  loadPreviousData() {
    const api = 'https://techxpertindia.in/api/get_task_details_by_task_id.php';
    this.http.post(api, this.update_userdetais).subscribe({
      next: (response: any) => {
        const temp = response?.data || {};
        const serverProgress = Number(temp.Status) || 0;

        // If server progress is higher than what we had locally, use server as baseline
        if (serverProgress > this.previousProgress) {
          this.previousProgress = Math.max(0, Math.min(100, serverProgress));
          localStorage.setItem('TaskProgress', String(this.previousProgress));
        }

        // recalc allowed additional
        this.maxAdditional = Math.max(0, 100 - this.previousProgress);

        // ensure additionalProgress is within allowed range
        if (this.additionalProgress > this.maxAdditional) {
          this.additionalProgress = this.maxAdditional;
        }

        // load remarks if present (optional)
        this.userdetails.Remarks = temp.Remarks || this.userdetails.Remarks;
      },
      error: (err) => {
        console.error('Load previous data error', err);
      }
    });
  }

  // slider change (additional progress)
  onAdditionalChange(event: any) {
    const newVal = Number(event.detail?.value ?? event);
    if (isNaN(newVal)) return;

    // clamp within allowed additional range
    this.additionalProgress = Math.max(0, Math.min(this.maxAdditional, newVal));
  }
async captureImage() {
  const loading = await this.loadingCtrl.create({
    message: 'Opening camera...',
    spinner: 'circles',
  });
  await loading.present();

  try {
    const photo = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,   // return base64
      source: CameraSource.Camera,           // open camera
      direction: CameraDirection.Rear,       // BACK camera
      saveToGallery: false
    });

    // BASE64 string (no prefix)
    const cleanBase64 = photo.base64String || '';

    // Assign to your object for API
    this.camera_user_details.imageData = cleanBase64;

    // For preview
    this.capturedImage = 'data:image/jpeg;base64,' + cleanBase64;

  } catch (error) {
    this.showToast('Camera cancelled or failed.');
    console.error('Camera error', error);
  } finally {
    loading.dismiss();
  }
}

  async submitDPR() {
    // compute final total progress
    const totalProgress = this.previousProgress + this.additionalProgress;

    // validations: must increase progress and add remarks
    if (!this.userdetails.Remarks || this.additionalProgress === 0) {
      this.showToast('Please add remarks and increase progress (choose additional %) before submitting.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Submitting DPR...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // If image present, upload image first (non-blocking but we attempt)
      if (this.camera_user_details.imageData) {
        this.http.post('https://techxpertindia.in/api/capture_image_for_dpr.php', this.camera_user_details)
          .subscribe({
            next: () => console.log('Image uploaded'),
            error: (err) => console.error('Image upload failed', err)
          });
      }

      // set final status for submission
      this.userdetails.Status = Math.max(0, Math.min(100, totalProgress));

      // submit DPR details
      this.http.post('https://techxpertindia.in/api/post_dpr_progress_details.php', this.userdetails)
        .subscribe({
          next: async (res) => {
            await loading.dismiss();

            // persist new baseline to localStorage so next open uses this as previousProgress
            localStorage.setItem('TaskProgress', String(this.userdetails.Status));
            this.previousProgress = this.userdetails.Status;

            // recompute allowed additional for future uses
            this.maxAdditional = Math.max(0, 100 - this.previousProgress);
            this.additionalProgress = 0; // reset slider

            this.showToast('DPR submitted successfully!');
            this.capturedImage = '';
            this.router.navigateByUrl('/dpr');
          },
          error: async (err) => {
            await loading.dismiss();
            console.error('Submit error', err);
            this.showToast('Submission failed. Try again.');
          }
        });

    } catch (err) {
      await loading.dismiss();
      console.error(err);
      this.showToast('An error occurred.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'dark',
      position: 'bottom',
    });
    toast.present();
  }
}
