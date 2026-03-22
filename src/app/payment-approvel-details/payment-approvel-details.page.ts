
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-payment-approvel-details',
  templateUrl: './payment-approvel-details.page.html',
  styleUrls: ['./payment-approvel-details.page.scss'],
})
export class PaymentApprovelDetailsPage implements OnInit {

  impact: any[] = [];
  show = false;

  // 🔥 HISTORY VARIABLES
  historyModal = false;
  paymentHistory: any[] = [];
paymentHistory_cfo: any = {};

  dataToSend = {
    TicketID: localStorage.getItem('Ticket_id'),
    Status: "Pending",
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController,
    private loader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.loadPayments();
      this.openHistory({ TicketID: this.dataToSend.TicketID });
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

    // ✅ Fix BillImage for each payment
    this.impact.forEach(pay => {

      if (pay.BillImage) {
        if (typeof pay.BillImage === 'string') {
          try {
            // If JSON string → convert to array
            pay.BillImage = JSON.parse(pay.BillImage);
          } catch {
            // If normal string → convert to single array
            pay.BillImage = [pay.BillImage];
          }
        }
      } else {
        pay.BillImage = [];
      }

      // 🔥 Call Finance API
      this.getFinanceData(pay);
    });

    this.loader.stop();
  });
}

  /* ================= FINANCE DATA ================= */

  getFinanceData(pay: any) {

    const body = {
      security_code: "Techxpertsequirtyabcdabcdabcdabcdabcdabcdefghijkllmnopqrst",
      TicketID: pay.TicketID
    };

    this.http.post(
      'https://techxpertindia.in/api/get_ticket_finance_data_by_ticketid.php',
      body
    ).subscribe((res: any) => {

      const data = res?.data || {};

      pay.C_VisitCharge = parseFloat(data.C_VisitCharge) || 0;
      pay.C_MaterialCost = parseFloat(data.C_MaterialCost) || 0;
      pay.C_LabourCost = parseFloat(data.C_LabourCost) || 0;
      pay.ExpectedBudget = parseFloat(data.ExpectedBudget) || 0;

      const totalCost =
        pay.C_VisitCharge +
        pay.C_MaterialCost +
        pay.C_LabourCost;

      const paid = parseFloat(pay.Amount) || 0;

      pay.profitLoss = totalCost - paid;

    });
  }

  /* ================= 🔥 PAYMENT HISTORY ================= */

  openHistory(pay: any) {
    this.loader.start();

    const body = {
      TicketID: pay.TicketID
    };

    this.http.post(
      'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
      body
    ).subscribe((res: any) => {

      this.loader.stop();

this.paymentHistory_cfo = res.data.summary || {};


      console.log("Payment History:", this.paymentHistory_cfo);

    }, async () => {

      this.loader.stop();

      const t = await this.toast.create({
        message: "Failed to load payment history",
        duration: 2000,
        color: "danger"
      });
      t.present();
    });
  }



openHistory_model(pay: any) {
  this.loader.start();

  const body = {
    TicketID: pay?.TicketID
  };

  this.http.post(
    'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
    body
  ).subscribe(
    async (res: any) => {

      this.loader.stop();

      // ✅ Safe response handling
      const payments = res?.data?.payments || [];

      // ✅ Fix BillImage for each history item
      this.paymentHistory = payments.map((item: any) => {

        if (item.BillImage) {
          if (typeof item.BillImage === 'string') {
            try {
              item.BillImage = JSON.parse(item.BillImage);
            } catch {
              item.BillImage = [item.BillImage];
            }
          }
        } else {
          item.BillImage = [];
        }

        return item;
      });

      this.historyModal = true;

      console.log("Payment History:", this.paymentHistory);
    },

    async (error) => {
      this.loader.stop();

      console.error("API Error:", error);

      const t = await this.toast.create({
        message: "Failed to load payment history",
        duration: 2000,
        color: "danger"
      });
      t.present();
    }
  );
}













  closeHistory() {
    this.historyModal = false;
  }

  /* ================= APPROVE ================= */

  approvePayment(pay: any) {
    this.loader.start();

    const body = {
      TicketID: pay.TicketID,
      PaymentID: pay.ID,
      IsStateApprove: "Yes"
    };

    this.http.post(
      'https://techxpertindia.in/api/change_ticket_payment_approval.php',
      body
    ).subscribe(async () => {

      this.loader.stop();

      const t = await this.toast.create({
        message: "Payment Approved Successfully",
        duration: 2000,
        color: "success"
      });
      t.present();

      this.loadPayments();

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

  /* ================= IMAGE ================= */

  openImage(img: string) {
    window.open(img, '_blank');
  }
}