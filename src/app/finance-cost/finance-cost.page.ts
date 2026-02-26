import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-finance-cost',
  templateUrl: './finance-cost.page.html',
  styleUrls: ['./finance-cost.page.scss'],
})
export class FinanceCostPage implements OnInit {

  constructor( private http: HttpClient,   private ngxService: NgxUiLoaderService,) { 
    this.Http()
  }
temp : any = {}

send ={
  "TicketID":localStorage.getItem("ID"),
}
  ngOnInit() {
  }


  Http() {
    this.ngxService.start()
    var url = 'https://techxpertindia.in/api/get_corporate_ticket_finance.php';
    return this.http.post(url, this.send).subscribe((data) => {
      console.log(data);
      console.log(data);
    
      this.temp = data 
      this.ngxService.stop()
    });
  }
  





}
