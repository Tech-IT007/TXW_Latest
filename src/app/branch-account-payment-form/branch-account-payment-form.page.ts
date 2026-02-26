import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-account-payment-form',
  templateUrl: './branch-account-payment-form.page.html',
  styleUrls: ['./branch-account-payment-form.page.scss'],
})
export class BranchAccountPaymentFormPage implements OnInit {


  billImage: string;
  qrImage: string;

  dataToSend :any = {
    TicketID: localStorage.getItem('ID'),
    Store: '',
    Amount: '',
    BillImageData: '',
    QrImageData: '',
   ScheduleDate : '',
      PaymentType : ''
  };

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

ngOnInit() {
  this.dataToSend.ScheduleDate = new Date().toISOString().split('T')[0]
}

  /* ---------------- BILL IMAGE ---------------- */

  async captureBillImage() {
    this.openActionSheet('bill');
  }

  /* ---------------- QR IMAGE ---------------- */

  async captureQRImage() {
    this.openActionSheet('qr');
  }

  /* ---------------- ACTION SHEET ---------------- */

  async openActionSheet(type: 'bill' | 'qr') {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.takePicture(CameraSource.Camera, type),
        },
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => this.takePicture(CameraSource.Photos, type),
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

  async takePicture(source: CameraSource, type: 'bill' | 'qr') {
    try {
      const photo = await Camera.getPhoto({
        quality: 40,
        resultType: CameraResultType.Base64,
        source,
      });

      const base64 = photo.base64String;

      if (type === 'bill') {
        this.billImage = 'data:image/jpeg;base64,' + base64;
        this.dataToSend.BillImageData = base64;
      } else {
        this.qrImage = 'data:image/jpeg;base64,' + base64;
        this.dataToSend.QrImageData = base64;
      }

    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  /* ---------------- SUBMIT ---------------- */

async submitPayment() {
  if (!this.dataToSend.Store || !this.dataToSend.Amount  || !this.dataToSend.BillImageData || !this.dataToSend.QrImageData || !this.dataToSend.PaymentType    )  {
    this.showToast('Please fill all required fields');
    return;
  }


  this.ngxService.start();

  const url = 'https://techxpertindia.in/api/post_ticket_payment.php';




  this.http.post(url,this.dataToSend ).subscribe({
    next: async (res: any) => {
      if (res.error === false) {
        this.showToast('Payment submitted successfully');
        this.router.navigate(['/account-payment']);
      } else {
        this.showToast(res.message);
      }
    },
    error: () => {
      this.showToast('Something went wrong');
    },
    complete: () => {
      this.ngxService.stop();
    }
  });
}

  /* ---------------- TOAST ---------------- */

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}











