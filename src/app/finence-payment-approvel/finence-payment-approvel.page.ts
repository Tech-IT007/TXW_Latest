
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-finence-payment-approvel',
  templateUrl: './finence-payment-approvel.page.html',
  styleUrls: ['./finence-payment-approvel.page.scss'],
})
export class FinencePaymentApprovelPage implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];

  hasMoreData = true;
  loading: any;

  // 👉 Approval flags
  IsFinanceApprove = localStorage.getItem("IsFinanceApprove");
  IsStateApprove = localStorage.getItem("IsStateApprove");

approvel: any = {
  StateName: (localStorage.getItem("StateName") || "").split(","),
  IsFinanceApprove: "",
  IsStateApprove: "Yes",
  "Status": "Pending",

};
  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.setApprovalStatus();
    this.allTickets();
  }

ngOnInit(): void {
  
}
  /* ================= LOADER ================= */
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading tickets...',
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  /* ================= SET APPROVAL CONDITION ================= */
setApprovalStatus() {

  // 👉 Finance Approver
  if (this.IsFinanceApprove === "Yes") {

    this.approvel.IsFinanceApprove = "No";


  }

  // 👉 State Approver
  else if (this.IsStateApprove === "Yes") {


    this.approvel.IsStateApprove = "No";


  }

  // 👉 Default (Both NO)
  else {

    this.approvel.IsFinanceApprove = "No";
    this.approvel.IsStateApprove = "No";


  }
}
  /* ================= FETCH DATA ================= */
  async allTickets(isRefresh = false) {

    const api = "https://techxpertindia.in/api/get-all-status-wise-payment-tickets.php";

    if (!isRefresh) {
      await this.presentLoading();
    }

    this.http.post(api, this.approvel).subscribe({
      next: (res: any) => {

        const newData = res.data || [];

        if (isRefresh) {
          this.tickets = newData;
        } else {
          this.tickets = [...this.tickets, ...newData];
        }

        this.filteredTickets = [...this.tickets];

        // Stop infinite scroll if no more data
        if (newData.length < this.approvel.no_of_records) {
          this.hasMoreData = false;
        }

        this.dismissLoading();
      },
      error: () => {
        this.dismissLoading();
      }
    });
  }

  /* ================= LOAD MORE ================= */
  loadMore(event: any) {

    this.approvel.start_counter += this.approvel.no_of_records;

    this.allTickets();

    setTimeout(() => {
      event.target.complete();
    }, 600);
  }

  /* ================= REFRESH ================= */
  refreshTickets(event: any) {

    this.approvel.start_counter = 0;
    this.hasMoreData = true;
    this.tickets = [];

    this.allTickets(true);

    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  /* ================= SEARCH ================= */
  filterTickets(event: any) {

    const searchValue = (event.target.value || '').toLowerCase();

    this.filteredTickets = this.tickets.filter((ticket: any) =>
      (ticket.TicketID || '').toLowerCase().includes(searchValue) ||
      (ticket.QuotationStatus || '').toLowerCase().includes(searchValue) ||
      (ticket.CreatedBy || '').toLowerCase().includes(searchValue)
    );
  }

  /* ================= STATUS COLOR ================= */
  getStatusClass(status: string) {

    if (!status) return 'status';

    status = status.toLowerCase();  

    if (status.includes('approved')) return 'status approved';
    if (status.includes('rejected')) return 'status rejected';
    if (status.includes('pending')) return 'status pending';

    return 'status';
  }

  /* ================= NAVIGATION ================= */
  viewDetails(id: string) {
    localStorage.setItem('Ticket_id', id);
 
    this.router.navigate(['/finence-payment-approvel-details']);
  }
}




















