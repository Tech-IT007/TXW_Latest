import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-approvel-details',
  templateUrl: './payment-approvel-details.page.html',
  styleUrls: ['./payment-approvel-details.page.scss'],
})
export class PaymentApprovelDetailsPage implements OnInit, OnDestroy {

  impact: any[] = [];
  show = false;

  historyModal = false;
  paymentHistory: any[] = [];
  paymentHistory_cfo: any = {};

  sub!: Subscription;

  dataToSend = {
    TicketID: localStorage.getItem('Ticket_id'),
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

  loadPayments() {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get-ticket-payments-details-by-ticketid.php',
      this.dataToSend
    ).subscribe({

      next: (res: any) => {
        this.impact = (res?.data || []).map((p: any) => ({
          ...p,
          BillImage: this.parseImages(p.BillImage)
        }));

        this.show = this.impact.length === 0;
        this.loadCfoSummary();
        this.loader.stop();
      },

      error: async () => {
        this.loader.stop();
        const t = await this.toast.create({
          message: "Failed to load data",
          duration: 2000,
          color: "danger"
        });
        t.present();
      }
    });
  }

  parseImages(img: any) {
    if (!img) return [];
    try { return typeof img === 'string' ? JSON.parse(img) : img; }
    catch { return [img]; }
  }

  loadCfoSummary() {
    this.http.post(
      'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
      { TicketID: this.dataToSend.TicketID }
    ).subscribe((res: any) => {
      this.paymentHistory_cfo = res?.data?.summary || {};
    });
  }

  openHistory_model(pay: any) {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/get_total_payment_details_by_ticket_id.php',
      { TicketID: pay.TicketID }
    ).subscribe({

      next: (res: any) => {
        this.paymentHistory = (res?.data?.payments || []).map((h: any) => ({
          ...h,
          BillImage: this.parseImages(h.BillImage)
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

  approvePayment(pay: any) {
    this.loader.start();

    this.http.post(
      'https://techxpertindia.in/api/change_ticket_payment_approval.php',
      {
        TicketID: pay.TicketID,
        PaymentID: pay.ID,
        IsStateApprove: "Yes"
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
      }
    });
  }

  async rejectPayment(pay: any) {

    const alert = await this.alertCtrl.create({
      header: 'Reject Payment',
      message: 'Are you sure?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: () => this.callRejectAPI(pay)
        }
      ]
    });

    await alert.present();
  }

  callRejectAPI(pay: any) {

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
      }
    });
  }

  openImage(img: string) {
    window.open(img, '_blank');
  }

  trackByTicket(i: number, item: any) {
    return item.TicketID;
  }
}