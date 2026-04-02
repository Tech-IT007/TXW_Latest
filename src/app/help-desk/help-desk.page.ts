import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {

  concerns: any[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient , private router: Router) {}
 handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
       this.getConcerns(); // Refresh the concerns list
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
  
  }

  ionViewWillEnter() {
    this.getConcerns();
  }

  getConcerns() {
    this.loading = true;

    const body = {
      EmployeeID: localStorage.getItem('EmployeeID')
    };

    this.http.post('https://techxpertindia.in/api/get-employee-concerns-by-employeeid.php', body)
      .subscribe((res: any) => {
        this.loading = false;
        this.concerns = res.data || [];
        console.log('Concerns:', this.concerns);
      }, (err) => {
        this.loading = false;
        console.error('API Error:', err);
      });
  }

  viewDetails(item: any) {
    console.log('View:', item);
    localStorage.setItem('SelectedConcern', JSON.stringify(item));
    this.router.navigate(['/help-desk-details']);
    // later you can navigate
    // this.router.navigate(['/help-desk-details'], { state: item });
  }

}