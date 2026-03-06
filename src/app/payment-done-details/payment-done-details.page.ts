import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-payment-done-details',
  templateUrl: './payment-done-details.page.html',
  styleUrls: ['./payment-done-details.page.scss'],
})
export class PaymentDoneDetailsPage implements OnInit {

  impact: any[] = [];
  show = false;

  selectedPaymentId: any = null;
  previewImage: any = null;

  paymentBase64: string = '';   // 🔥 Main image variable
  isSubmitting = false;

  dataToSend = { 
    TicketID: localStorage.getItem('Ticket_id'),
    Status: "Pending"
  };

  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private loader: NgxUiLoaderService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadPayments();
  }

  /* ================= LOAD PAYMENTS ================= */

  loadPayments() {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get-ticket-payments-details-by-ticketid.php',
      this.dataToSend
    ).subscribe((res: any) => {

      this.impact = res?.data || [];
      this.show = this.impact.length === 0;
      this.loader.stop();

    }, () => {

      this.loader.stop();
      this.impact = [];
      this.show = true;

    });
  }

  /* ================= FILE SELECT (GALLERY) ================= */

  onFileSelected(event: any, pay: any) {

    const file = event.target.files[0];
    if (!file) return;

    this.selectedPaymentId = pay.ID;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {

      const result: any = reader.result;

      // Preview with prefix
      this.previewImage = result;

      // Remove prefix for API
      this.paymentBase64 = result.split(',')[1];
    };
  }

  /* ================= CAMERA CAPTURE ================= */

  async capture(pay: any): Promise<void> {

    const loading = await this.loadingCtrl.create({
      message: 'Opening camera...',
      spinner: 'circles'
    });

    await loading.present();

    try {

      const photo = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      this.selectedPaymentId = pay.ID;

      // Base64 for API
      this.paymentBase64 = photo.base64String || '';

      // Preview
      this.previewImage = 'data:image/jpeg;base64,' + photo.base64String;

    } catch (err) {
      console.error('Camera error:', err);
    } finally {
      await loading.dismiss();
    }
  }

  /* ================= SUBMIT PAYMENT ================= */

  submitPayment(pay: any) {

    if (!this.paymentBase64 || this.isSubmitting) return;

    this.isSubmitting = true;
    this.loader.start();

    const body = {
      TicketID: pay.TicketID,
      PaymentID: pay.ID,
      EmployeeID: localStorage.getItem("EmployeeID"),
      PaymentScreenShot: this.paymentBase64
    };

    this.http.post(
      'https://techxpertindia.in/api/post_change_tickets_payment_status.php',
      body
    ).subscribe(async (res: any) => {

      this.loader.stop();
      this.isSubmitting = false;

      const t = await this.toast.create({
        message: "Payment Submitted Successfully",
        duration: 2000,
        color: "success"
      });
      t.present();

      // Reset
      this.previewImage = null;
      this.paymentBase64 = '';
      this.selectedPaymentId = null;

      this.loadPayments();

    }, async () => {

      this.loader.stop();
      this.isSubmitting = false;

      const t = await this.toast.create({
        message: "Submission Failed",
        duration: 2000,
        color: "danger"
      });
      t.present();
    });
  }
}