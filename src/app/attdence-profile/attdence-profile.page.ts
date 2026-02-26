import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-attdence-profile',
  templateUrl: './attdence-profile.page.html',
  styleUrls: ['./attdence-profile.page.scss'],
})
export class AttdenceProfilePage implements OnInit {
  temp: any;
  constructor(
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  dataToSend : any = {
    "EmployeeID": 1,
    " Latitude": localStorage.getItem("latitude"),
    " Longitude ": localStorage.getItem("longitude")
  }
  
  run() {

   
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

      var url = "https://techxpertindia.in/api/punch_out_employee_attendance.php"
      return this.http.post(url, this.dataToSend).subscribe((data) => {
        console.log(data);

        this.temp = data
        this.temp = this.temp.InTimeStatus
        console.log(this.temp)

        if (this.temp == "0") {

          // this.router.navigateByUrl("attdenc-in")

        } else {
          // this.router.navigateByUrl("attdenc-out")
        }

      });



    }, 100);


  }


}
