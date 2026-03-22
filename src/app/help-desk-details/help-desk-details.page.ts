import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-desk-details',
  templateUrl: './help-desk-details.page.html',
  styleUrls: ['./help-desk-details.page.scss'],
})
export class HelpDeskDetailsPage implements OnInit {

  details: any = {};
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.loading = true;

    const body = {
      Id: localStorage.getItem('SelectedConcern')
    };

    this.http.post('https://techxpertindia.in/api/get-employee-concerns-details.php', body)
      .subscribe((res: any) => {
        this.loading = false;
        this.details = res.data || {};
        console.log("Details:", this.details);
      }, (err) => {
        this.loading = false;
        console.error("API Error:", err);
      });
  }

}