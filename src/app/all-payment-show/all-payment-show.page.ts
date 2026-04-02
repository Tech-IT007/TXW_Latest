import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-all-payment-show',
  templateUrl: './all-payment-show.page.html',
  styleUrls: ['./all-payment-show.page.scss'],
})
export class AllPaymentShowPage {
 handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
          this.all_paymet_data();
      event.target.complete();
    }, 2000);
  }

rejectedTotal: number = 0;
paidTotal: number = 0;
  paymentList:any[]=[];
  grandTotal:number=0;

  payment_data={
    TicketID:localStorage.getItem('ID')
  };

  constructor(
    private http:HttpClient,
    private router:Router
  ){}

  ionViewWillEnter(){
    this.all_paymet_data();
  }

  all_paymet_data(){

    const url='https://techxpertindia.in/api/get_payment_list_ticket.php';

    this.http.post(url,this.payment_data).subscribe((res:any)=>{

      if(res){
        this.paymentList=res;
        this.calculateGrandTotal();
      }

    });

  }

viewPayment(item: any) 
{ console.log('Payment Details:', item);
   localStorage.setItem('paymentDetails', item); 
   
   this.router.navigate(['/all-payment-details']); 
}

calculateGrandTotal() {

  this.grandTotal = 0;
  this.rejectedTotal = 0;
  this.paidTotal = 0;

  this.paymentList.forEach(item => {

    const amount = Number(item?.Amount || 0);
    const status = (item?.Status || '').toLowerCase();

    if (status === 'rejected') {
      this.rejectedTotal += amount;
    } 
    else if (status === 'paid') {
      this.paidTotal += amount;
      this.grandTotal += amount;
    } 
    else {
      // pending / partial etc.
      this.grandTotal += amount;
    }

  });

}
  /* FORMAT AMOUNT */

  formatAmount(amount:any){

    if(!amount) return '0';

    return Number(amount).toLocaleString('en-IN');

  }

  /* FORMAT DATE TIME */

  formatDateTime(date:any,time:any){

    if(!date) return '';

    const d=new Date(date+' '+time);

    const formattedDate=d.toLocaleDateString('en-GB',{
      day:'numeric',
      month:'short',
      year:'numeric'
    });

    const formattedTime=d.toLocaleTimeString('en-US',{
      hour:'numeric',
      minute:'2-digit'
    });

    return formattedTime+' | '+formattedDate;

  }

}