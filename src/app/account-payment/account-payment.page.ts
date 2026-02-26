
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-payment',
  templateUrl: './account-payment.page.html',
  styleUrls: ['./account-payment.page.scss'],
})
export class AccountPaymentPage implements OnInit {

  paymentList: any[] = [];
grandTotal: number = 0;
  payment_data = {
    TicketID: localStorage.getItem('ID')
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
ionViewWillEnter() {
    this.all_paymet_data();
  }
  ngOnInit() {
  }

  all_paymet_data() {
    const url = 'https://techxpertindia.in/api/get_payment_list_ticket.php';
    this.http.post(url, this.payment_data).subscribe((res: any) => {
      if (res && res) {
        this.paymentList = res;
      }
        this.calculateGrandTotal()
    });
   
  }

  viewPayment(item: any) {
    console.log('Payment Details:', item);
    localStorage.setItem('paymentDetails', item);
    this.router.navigate(['/branch-account-payment-details']);

    // this.router.navigate(['/payment-details'], { state: item });
  }
  calculateGrandTotal() {
  this.grandTotal = this.paymentList.reduce(
    (sum, item) => sum + Number(item.Amount || 0),
    0
  );
}


}



















