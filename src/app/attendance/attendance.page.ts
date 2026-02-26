import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  use: any = {}
  users: any ={}
  obj: any;
  temp: any;
  show: boolean;
  dataToSend :any = {
    "EmployeeID":localStorage.getItem("EmployeeID"),

  }
  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
  ) { }

  ngOnInit() {
    this.runHttp()
  }
  runHttp() {

    var url = "https://techxpertindia.in/api/get_employee_attendance_status.php";
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.use = data
      this.users = data;
      this.users = this.users.data.attendace_records
      console.log(this.users);
      
  
    });
  }
}
