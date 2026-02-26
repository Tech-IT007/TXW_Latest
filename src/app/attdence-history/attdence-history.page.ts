// home.page.ts
import { Component, OnInit } from '@angular/core';
// Import the HttpClient module for API calls
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attdence-history',
  templateUrl: './attdence-history.page.html',
  styleUrls: ['./attdence-history.page.scss'],
})
export class AttdenceHistoryPage implements OnInit {
  currentYear: number = new Date().getFullYear();
  selectedYear: number = this.currentYear;
  selectedMonth: number = new Date().getMonth() + 1; // current month in numeric format

  years: number[] = [];
  months: { name: string; value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  temp: any
  show: boolean;
  length: any;
  hidd: boolean;

  constructor(private http: HttpClient) {
    // Generate a range of years (e.g., current year ± 5 years)
    for (let i = this.currentYear - 5; i <= this.currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  sendData() {
    this.show = true
    // URL of the API endpoint
    const apiUrl = 'https://techxpertindia.in/api/employee/get_attendance_records.php';
    const requestData = {
      s_year: this.selectedYear,
      s_month: this.selectedMonth,
      "EmployeeID": localStorage.getItem("EmployeeID"),
    };

    // Call the API with the selected year and month
    this.http.post(apiUrl, requestData).subscribe(
      response => {
        console.log('API response:', response);

        this.temp =  response
        this.temp = this.temp.data
        this.length = response 
        this.length = this.length.data.length
         console.log(this.length)

         if(this.length == 0 ){
          this.hidd = true;
         }else{
           this.hidd = false;
         }
      },
      
 
    );
  }
  ngOnInit() {
  }
}







