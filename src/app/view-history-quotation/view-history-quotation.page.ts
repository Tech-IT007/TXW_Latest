import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-view-history-quotation',
  templateUrl: './view-history-quotation.page.html',
  styleUrls: ['./view-history-quotation.page.scss'],
})
export class ViewHistoryQuotationPage implements OnInit {

  historyList: any[] = [];
  loading: HTMLIonLoadingElement | null = null;

  dataToSend = {
    TicketID: localStorage.getItem('ID'),
  };

  quotion_history = {
    quotationID: '',
  };

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getTicketQuotationID();
  }

  /* ================= Loading ================= */

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading quotation history...',
      spinner: 'crescent',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  /* ================= Step 1: Get Quotation ID ================= */

  async getTicketQuotationID() {
    await this.presentLoading();

    const url =
      'https://techxpertindia.in/api/get_corporate_ticket_detail.php';

    this.http
      .post<any>(url, this.dataToSend, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (res) => {
          this.quotion_history.quotationID =
            res?.data?.TicketQuotationID || '';

          if (this.quotion_history.quotationID) {
            this.getHistory();
          } else {
            this.dismissLoading();
          }
        },
        error: (err) => {
          console.error('Ticket API Error:', err);
          this.dismissLoading();
        },
      });
  }

  /* ================= Step 2: Get History ================= */

  getHistory() {
    if (!this.quotion_history.quotationID) {
      return;
    }

    this.http
      .post<any>(
        'https://techxpertindia.in/api/get_quotation_line_Items.php',
        { QuotationID: this.quotion_history.quotationID }
      )
      .subscribe({
        next: (res) => {
          this.historyList = res?.data || [];
          this.dismissLoading();
        },
        error: (err) => {
          console.error('History API Error:', err);
          this.dismissLoading();
        },
      });
  }
}
