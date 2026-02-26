import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quation',
  templateUrl: './create-quation.page.html',
  styleUrls: ['./create-quation.page.scss'],
})
export class CreateQuationPage implements OnInit {
  ticketID: string | null = localStorage.getItem('ID');
  quotationID: string | null = null;

  /* ===== CATEGORY ===== */
  categoryList: any[] = [];
  selectedCategory: string | null = null;
  rateCardList: any[] = [];
  historyList: any[] = [];
  cartCount = 0;
  showCart = false;

  private loading?: HTMLIonLoadingElement;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  /* ================= INIT ================= */
  async ngOnInit() {
    await this.presentLoading('Loading quotation...');
    this.getTicketQuotationID(); // 🔹 CALL ONLY ONCE
    this.loadCategories();
  }

  /* ================= LOADER ================= */
  async presentLoading(message: string) {
    if (this.loading) return;
    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = undefined;
    }
  }

  /* ================= CATEGORY ================= */
  loadCategories() {
    this.http
      .post<any>('https://techxpertindia.in/api/get_all_categories.php', {})
      .subscribe({
        next: (res) => (this.categoryList = res?.data || []),
        error: () => this.dismissLoading(),
      });
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.getRateCard();
    }
  }

  /* ================= RATE CARD ================= */
  async getRateCard() {
    if (!this.selectedCategory) return;
    await this.presentLoading('Loading rate card...');

    this.http
      .post<any>('https://techxpertindia.in/api/get_rate_card.php', {
        CompanyID: localStorage.getItem('Company_id'),
        Category: this.selectedCategory,
      })
      .subscribe({
        next: (res) => {
          this.rateCardList = (res?.data || []).map((item: any) => ({
            ...item,
            checked: false,
            qty: 1,
            alreadyAdded: false,
          }));
          this.markAlreadyAddedItems();
          this.dismissLoading();
        },
        error: () => this.dismissLoading(),
      });
  }

  onCheckboxChange(item: any) {
    if (!item.checked) item.qty = 1;
  }

  /* ================= ADD TO CART ================= */
  async addToCart(item: any) {
    if (item.qty <= 0) return;
    await this.presentLoading('Adding item...');

    const payload = {
      TicketQuotationID: this.quotationID,
      TicketID: this.ticketID,
      LineItemID: item.id,
      quantity: item.qty,
      CreatedBy: 'admin',
    };

    console.log('ADD TO CART PAYLOAD:', payload);

    this.http
      .post<any>('https://techxpertindia.in/api/add_line_item_to_quotation.php', payload)
      .subscribe({
        next: (res) => {
          console.log('ADD TO CART RESPONSE:', res);
          this.quotationID = res.QuotationID;
          if (this.quotationID) {
            localStorage.setItem('QuotationID', this.quotationID);
          }

          item.checked = false;

          // 🔹 Call history API only
          this.getHistory();
          this.dismissLoading();
        },
        error: (err) => {
          console.error('ADD TO CART ERROR:', err);
          this.dismissLoading();
        },
      });
  }

  /* ================= CART / HISTORY ================= */
  toggleCart() {
    this.showCart = !this.showCart;
  }

  async getHistory() {
    if (!this.quotationID || this.quotationID === '-1') return;
    await this.presentLoading('Loading cart...');

    this.http
      .post<any>('https://techxpertindia.in/api/get_quotation_line_Items.php', {
        QuotationID: this.quotationID,
      })
      .subscribe({
        next: (res) => {
          this.historyList = res?.data || [];
          this.cartCount = this.historyList.length;
          this.markAlreadyAddedItems();
          this.dismissLoading();
        },
        error: () => this.dismissLoading(),
      });
  }

  markAlreadyAddedItems() {
    this.rateCardList.forEach((item) => {
      item.alreadyAdded = this.historyList.some((h) => h.LineItemID === item.id);
    });
  }

  /* ================= QUOTATION ID ================= */
  getTicketQuotationID() {
    this.http
      .post<any>(
        'https://techxpertindia.in/api/get_corporate_ticket_detail.php',
        { TicketID: this.ticketID },
        { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
      )
      .subscribe({
        next: (res) => {
          const qid = res?.data?.TicketQuotationID;
          this.quotationID = qid;
          console.log('TicketQuotationID:', qid);

          this.getHistory(); // 🔹 SAFE CALL
          this.dismissLoading();
        },
        error: () => this.dismissLoading(),
      });
  }

  /* ================= SUBMIT ================= */
  async submitQuotation() {
    if (this.cartCount === 0) {
      const alert = await this.alertCtrl.create({
        header: 'No Items',
        message: 'Please add at least one item before submitting.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const confirm = await this.alertCtrl.create({
      header: 'Confirm Submission',
      message: `Submit ${this.cartCount} item(s)?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Submit',
          handler: async () => {
            await this.presentLoading('Submitting quotation...');
            await this.dismissLoading();

            const success = await this.alertCtrl.create({
              header: 'Success',
              message: 'Quotation submitted successfully ✅',
              buttons: ['OK'],
            });
            await success.present();

            this.router.navigateByUrl('/cop-current-tickets');
          },
        },
      ],
    });

    await confirm.present();
  }
}
