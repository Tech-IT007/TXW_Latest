import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-payment-details',
  templateUrl: './all-payment-details.page.html',
  styleUrls: ['./all-payment-details.page.scss'],
})
export class AllPaymentDetailsPage implements OnInit {

  payment: any = {};

  payment_details = {
    ID: localStorage.getItem('paymentDetails')
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPaymentDetails();
  }

  getPaymentDetails() {
    const url = 'https://techxpertindia.in/api/ticket_payment_details_by_id.php';
    this.http.post(url, this.payment_details).subscribe((res: any) => {
      if (res && res.data) {
        this.payment = res.data;
      }
    });
  }
}
