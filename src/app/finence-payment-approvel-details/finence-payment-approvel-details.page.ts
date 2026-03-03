import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-finence-payment-approvel-details',
  templateUrl: './finence-payment-approvel-details.page.html',
  styleUrls: ['./finence-payment-approvel-details.page.scss'],
})
export class FinencePaymentApprovelDetailsPage implements OnInit {

  impact: any[] = [];
  show = false;

  dataToSend =
   { 
    TicketID: localStorage.getItem('Ticket_id'),
     "Status": "Pending",

   };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController,
    private loader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // this.dataToSend.TicketID = params.BookingID;
      this.loadPayments();
    });
  }

  /* ================= LOAD PAYMENTS ================= */

  loadPayments() {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get-ticket-payments-details-by-ticketid.php',
      this.dataToSend
    ).subscribe((res: any) => {

      this.impact = res.data || [];
      this.show = this.impact.length === 0;

      this.loader.stop();
    });
  }

  /* ================= APPROVE PAYMENT ================= */

  approvePayment(pay: any) {
    this.loader.start();

    const body = {
      TicketID: pay.TicketID,
      PaymentID: pay.ID,   // <-- important
      "IsFinanceApprove": "Yes"
    };

    this.http.post(
      'https://techxpertindia.in/api/change_ticket_payment_approval.php',
      body
    ).subscribe(async (res: any) => {

      this.loader.stop();

      const t = await this.toast.create({
        message: "Payment Approved Successfully",
        duration: 2000,
        color: "success"
      });
      t.present();

      this.loadPayments(); // refresh list

    }, async () => {
      this.loader.stop();

      const t = await this.toast.create({
        message: "Approval Failed",
        duration: 2000,
        color: "danger"
      });
      t.present();
    });
  }

  /* ================= IMAGE VIEW ================= */

  openImage(img: string) {
    window.open(img, '_blank');
  }
}















