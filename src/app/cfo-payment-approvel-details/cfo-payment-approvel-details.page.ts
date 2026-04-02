import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cfo-payment-approvel-details',
  templateUrl: './cfo-payment-approvel-details.page.html',
  styleUrls: ['./cfo-payment-approvel-details.page.scss'],
})
export class CFOPaymentApprovelDetailsPage implements OnInit, OnDestroy {

  impact: any[] = [];
  show = false;

  paymentHistory_cfo: any = {};
  historyModal = false;
  paymentHistory: any[] = [];

  sub!: Subscription;

  dataToSend = {
    TicketID: localStorage.getItem('cfo_Ticket_id') || '',
    Status: "Pending",
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toast: ToastController,
    private loader: NgxUiLoaderService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(() => {
      this.loadPayments();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  /* ================= LOAD ================= */

  loadPayments() {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get-ticket-payments-details-by-paymentid-for-cfo.php',
      this.dataToSend
    ).subscribe({

      next: (res: any) => {

        this.impact = (res?.data || []).map((pay: any) => ({
          ...pay,
          BillImage: this.fixImage(pay.BillImage),
          QrImage: this.fixImage(pay.QrImage)
        }));

        this.show = this.impact.length === 0;

        this.loadSummary();

        this.impact.forEach(p => this.getFinanceData(p));

        this.loader.stop();
      },

      error: async () => {
        this.loader.stop();

        const t = await this.toast.create({
          message: "Failed to load payments",
          duration: 2000,
          color: "danger"
        });
        t.present();
      }
    });
  }

  /* ================= IMAGE ================= */

  fixImage(img: any) {
    if (!img) return '';

    if (typeof img === 'string') {
      try {
        const parsed = JSON.parse(img);
        return Array.isArray(parsed) ? parsed[0] : parsed;
      } catch {
        return img;
      }
    }

    return img;
  }

  /* ================= FINANCE ================= */

  getFinanceData(pay: any) {

    const body = {
      security_code: "Techxpertsequirtyabcdabcdabcdabcdabcdabcdefghijkllmnopqrst",
      TicketID: pay.TicketID
    };

    this.http.post(
      'https://techxpertindia.in/api/get_ticket_finance_data_by_ticketid.php',
      body
    ).subscribe((res: any) => {

      const d = res?.data || {};

      pay.C_VisitCharge = +d.C_VisitCharge || 0;
      pay.C_MaterialCost = +d.C_MaterialCost || 0;
      pay.C_LabourCost = +d.C_LabourCost || 0;
      pay.ExpectedBudget = +d.ExpectedBudget || 0;
    });
  }

  /* ================= SUMMARY ================= */

  loadSummary() {
    this.http.post(
      'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
      { TicketID: this.dataToSend.TicketID }
    ).subscribe((res: any) => {
      this.paymentHistory_cfo = res?.data?.summary || {};
    });
  }

  /* ================= HISTORY ================= */

  openHistory_model(pay: any) {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
      { TicketID: pay.TicketID }
    ).subscribe({

      next: (res: any) => {

        this.paymentHistory = (res?.data?.payments || []).map((h: any) => ({
          ...h,
          BillImage: this.fixImage(h.BillImage),
          QrImage: this.fixImage(h.QrImage)
        }));

        this.historyModal = true;
        this.loader.stop();
      },

      error: async () => {
        this.loader.stop();

        const t = await this.toast.create({
          message: "Failed to load history",
          duration: 2000,
          color: "danger"
        });
        t.present();
      }
    });
  }

  closeHistory() {
    this.historyModal = false;
  }

  /* ================= APPROVE ================= */

  approvePayment(pay: any) {

    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/change_ticket_payment_approval.php',
      {
        TicketID: pay.TicketID,
        PaymentID: pay.ID,
        IsCfoApprove: "Yes"
      }
    ).subscribe({

      next: async () => {

        this.loader.stop();

        const t = await this.toast.create({
          message: "Approved",
          duration: 2000,
          color: "success"
        });
        t.present();

        this.loadPayments();
      },

      error: async () => {

        this.loader.stop();

        const t = await this.toast.create({
          message: "Approval Failed",
          duration: 2000,
          color: "danger"
        });
        t.present();
      }
    });
  }

  /* ================= REJECT ================= */

  async rejectPayment(pay: any) {

    const alert = await this.alertCtrl.create({
      header: 'Reject Payment',
      message: 'Are you sure?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: () => this.confirmReject(pay)
        }
      ]
    });

    await alert.present();
  }

  confirmReject(pay: any) {

    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/change_ticket_payment_not_approval.php',
      {
        TicketID: pay.TicketID,
        PaymentID: pay.ID,
        IsStateApprove: "No",
        IsFinanceApprove: "No",
        IsCfoApprove: "No"
      }
    ).subscribe({

      next: async () => {

        this.loader.stop();

        const t = await this.toast.create({
          message: "Rejected",
          duration: 2000,
          color: "warning"
        });
        t.present();

        this.loadPayments();
      },

      error: async () => {

        this.loader.stop();

        const t = await this.toast.create({
          message: "Reject Failed",
          duration: 2000,
          color: "danger"
        });
        t.present();
      }
    });
  }

  /* ================= IMAGE ================= */

  openImage(img: string) {
    if (img) window.open(img, '_blank');
  }
}