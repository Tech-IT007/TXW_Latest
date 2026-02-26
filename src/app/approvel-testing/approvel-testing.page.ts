import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-approvel-testing',
  templateUrl: './approvel-testing.page.html',
  styleUrls: ['./approvel-testing.page.scss'],
})
export class ApprovelTestingPage implements OnInit {
  data_history = {
    "EmployeeID":localStorage.getItem("EmployeeID"),
  }
  users: any;
  constructor(public router : Router , private http :HttpClient, public toastController: ToastController,) { 
   this.leave_histoy ()
  ;}

  ngOnInit() {
  }
  leave_histoy (){
    var api = "https://techxpertindia.in/api/employee/get_leave_history.php"
  
    return this.http.post(api,this.data_history).subscribe((data)=>{
  
      console.log(data);
      this.users = data;
      this.users = this.users.data;
      console.log(this.users);
    })
  }
  
}
