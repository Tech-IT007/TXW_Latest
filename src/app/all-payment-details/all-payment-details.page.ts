import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-payment-details',
  templateUrl: './all-payment-details.page.html',
  styleUrls: ['./all-payment-details.page.scss'],
})
export class AllPaymentDetailsPage implements OnInit {

  payment: any = {};
  payment_history: any[] = [];

  formattedDate: any;

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

    if (res) {

      this.payment = res.data;

      // ✅ Handle Bill Image Array safely
      if (this.payment.BillImage && typeof this.payment.BillImage === 'string') {
        try {
          this.payment.BillImage = JSON.parse(this.payment.BillImage);
        } catch {
          this.payment.BillImage = [this.payment.BillImage];
        }
      }

      // ✅ If already array, keep as it is
      if (Array.isArray(this.payment.BillImage)) {
        this.payment.BillImage = this.payment.BillImage;
      }

      this.payment_history = res.payment_history || [];

      this.formatDateTime();

    }

  }, (error) => {
    console.error('API Error:', error);
  });

}
  formatDateTime() {

    if (!this.payment.CreatedDate) return;

    const date = new Date(this.payment.CreatedDate + ' ' + this.payment.CreatedTime);

    const options: any = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-GB', options);

    let hours = date.getHours();
    let minutes: any = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? '0'+minutes : minutes;

    this.formattedDate = `${hours}:${minutes} ${ampm} | ${formattedDate}`;

  }

}