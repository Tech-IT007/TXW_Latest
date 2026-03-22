import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-payment-done-details',
  templateUrl: './payment-done-details.page.html',
  styleUrls: ['./payment-done-details.page.scss']
})

export class PaymentDoneDetailsPage implements OnInit {
historyModal=false;
selectedHistory:any[]=[];
  impact: any[] = [];
  show = false;

  selectedPaymentId: any = null;

  previewImage: any = null;
  paymentBase64 = '';

  isSubmitting = false;

  dataToSend = {
    PaymentID: localStorage.getItem("cfo_payment_id"),
    Status: "Pending , Partially Paid , Paid"
  };
  store: any = {};

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

openHistory(pay:any){

this.selectedHistory=pay.SplitPaymentHistory || [];
console.log(this.selectedHistory);
this.historyModal=true;

}

closeHistory(){

this.historyModal=false;

}
  loadPayments() {

    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get-ticket-payments-details-by-paymentid.php',
      this.dataToSend
    ).subscribe((res: any) => {

      this.impact = res?.data || [];

      this.show = this.impact.length === 0;
       
      /* Initialize local fields safely */
    this.store = res?.data?.[0]?.Store || '';
   
      this.impact.forEach((pay: any) => {
        pay.enterAmount = '';
        pay.dueAmount = pay.RemainingAmount;
      });

      this.loader.stop();

    }, () => {

      this.loader.stop();
      this.show = true;

    });

  }

  /* ================= OPEN PAYMENT FORM ================= */

  openPaymentOptions(pay: any) {

    this.selectedPaymentId = pay.ID;

    this.previewImage = null;
    this.paymentBase64 = '';

    pay.enterAmount = '';
    pay.dueAmount = pay.RemainingAmount;

  }

  /* ================= CALCULATE DUE ================= */

calculateDue(pay: any) {

  const paid = parseFloat(pay.enterAmount) || 0;
  const remaining = parseFloat(pay.RemainingAmount) || 0;

  if (paid > remaining) {

    alert("Amount cannot be greater than Remaining Amount");

    pay.enterAmount = '';
    pay.dueAmount = remaining;
    return;

  }

  pay.dueAmount = remaining - paid;

}
  /* ================= CAMERA ================= */

  async capture(pay: any) {

    const loading = await this.loadingCtrl.create({
      message: 'Opening Camera...'
    });

    await loading.present();

    try {

      const photo = await Camera.getPhoto({

        quality: 60,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera

      });

      if (photo?.base64String) {

        this.paymentBase64 = photo.base64String;

        this.previewImage = 'data:image/jpeg;base64,' + photo.base64String;

      }

    } catch (e) {

      console.log("Camera Error:", e);

    }

    await loading.dismiss();

  }

  /* ================= SUBMIT PAYMENT ================= */

  submitPayment(pay: any) {

    if (this.isSubmitting) return;

    if (!this.paymentBase64) {
      alert("Please upload payment voucher");
      return;
    }

    if (!pay.enterAmount) {
      alert("Please enter payment amount");
      return;
    }

    this.isSubmitting = true;

    this.loader.start();

    const body = {

      TicketID: pay.TicketID,
      PaymentID: pay.ID,
      EmployeeID: localStorage.getItem("EmployeeID"),
      PaymentScreenShot: this.paymentBase64,
      Amount: pay.enterAmount,
      Remark: pay.Remarks


    };

    this.http.post(
      'https://techxpertindia.in/api/post_split_ammount_paid_by_cfo.php',
      body
    ).subscribe(async () => {

      this.loader.stop();
      this.isSubmitting = false;

      const toast = await this.toast.create({
        message: 'Payment Submitted Successfully',
        duration: 2000,
        color: 'success'
      });

      toast.present();

      this.resetForm();
      this.loadPayments();

    }, async () => {

      this.loader.stop();
      this.isSubmitting = false;

      const toast = await this.toast.create({
        message: 'Submission Failed',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

    });

  }

  /* ================= RESET FORM ================= */

  resetForm() {

    this.previewImage = null;
    this.paymentBase64 = '';
    this.selectedPaymentId = null;
    this.isSubmitting = false;

  }

}