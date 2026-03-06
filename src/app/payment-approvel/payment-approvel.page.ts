import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-payment-approvel',
  templateUrl: './payment-approvel.page.html',
  styleUrls: ['./payment-approvel.page.scss'],
})
export class PaymentApprovelPage implements OnInit {

  tickets: any[] = [];
  filteredTickets: any[] = [];
  selectedSegment: string = 'current';
  loading: any;

  approvel: any = {
    StateName: (localStorage.getItem("StateName") || "").split(","),
    Status: "Pending",
    IsFinanceApprove: "",
    IsStateApprove: "",
    IsCfoApprove: "",
    start_counter: 0,
    no_of_records: 10
  };

  IsFinanceApprove = localStorage.getItem("IsFinanceApprove");
  IsStateApprove = localStorage.getItem("IsStateApprove");

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  /* ================= INIT ================= */
  ngOnInit(): void {
    this.loadCurrentTickets();
  }

  /* ================= SEGMENT CHANGE ================= */
  segmentChanged(event: any) {

    const value = event.detail.value;

    this.tickets = [];
    this.filteredTickets = [];
    this.approvel.start_counter = 0;

    if (value === 'current') {
      this.loadCurrentTickets();
    } else {
      this.loadPaymentDoneTickets();
    }
  }

  /* ================= CURRENT TAB ================= */
  loadCurrentTickets() {

    // Reset object cleanly
    this.approvel = {
      StateName: (localStorage.getItem("StateName") || "").split(","),
      Status: "Pending",
      IsFinanceApprove: "",
      IsStateApprove: "",
      start_counter: 0,
      no_of_records: 10
    };

    // Apply approval rules
    this.setApprovalStatus();

    this.allTickets();
  }

  /* ================= PAYMENT DONE TAB ================= */
  loadPaymentDoneTickets() {

    // Completely clean object
    this.approvel = {
      StateName: (localStorage.getItem("StateName") || "").split(","),
      IsCfoApprove: "Yes",
      start_counter: 0,
      no_of_records: 10
    };

    this.allTickets();
  }

  /* ================= SET APPROVAL CONDITION ================= */
  setApprovalStatus() {

    if (this.IsFinanceApprove === "Yes") {
      this.approvel.IsFinanceApprove = "No";
    }
    else if (this.IsStateApprove === "Yes") {
      this.approvel.IsStateApprove = "No";
    }
    else {
      this.approvel.IsFinanceApprove = "No";
      this.approvel.IsStateApprove = "No";
    }
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

  /* ================= FETCH DATA ================= */
  async allTickets() {

    const api = "https://techxpertindia.in/api/get-all-ticket-payments-by-state.php";

    await this.presentLoading();

    this.http.post(api, this.approvel).subscribe({
      next: (res: any) => {
        this.tickets = res.data || [];
        this.filteredTickets = [...this.tickets];
        this.dismissLoading();
      },
      error: () => {
        this.dismissLoading();
      }
    });
  }

  /* ================= REFRESH ================= */
  refreshTickets(event: any) {

    this.approvel.start_counter = 0;
    this.allTickets();

    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  /* ================= SEARCH ================= */
  filterTickets(event: any) {

    const searchValue = (event.target.value || '').toLowerCase();

    this.filteredTickets = this.tickets.filter((ticket: any) =>
      (ticket.TicketID || '').toLowerCase().includes(searchValue) ||
      (ticket.Status || '').toLowerCase().includes(searchValue) ||
      (ticket.CreatedBy || '').toLowerCase().includes(searchValue)
    );
  }

  /* ================= STATUS CLASS ================= */
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

  if (this.selectedSegment === 'current') {
    this.router.navigate(['/payment-approvel-details']);
  } 
  else {
    this.router.navigate(['/payment-done-details']);
  }

}

}