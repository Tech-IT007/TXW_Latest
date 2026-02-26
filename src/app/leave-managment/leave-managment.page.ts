import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-leave-managment',
  templateUrl: './leave-managment.page.html',
  styleUrls: ['./leave-managment.page.scss'],
})
export class LeaveManagmentPage implements OnInit {
User_details = {
  "EmployeeID":localStorage.getItem("EmployeeID"),
  "FromDate":"",
  "ToDate":"",
  "TypeOfLeave":"",
  "CreatedBy": localStorage.getItem("workname"),
  "ReasonOfLeave":"",
  "Duration" : "",
}


data_history = {
  "EmployeeID":localStorage.getItem("EmployeeID"),
}


  hidd : boolean;
  Duration : boolean;
  Duration2 :boolean
  show : boolean = true;
  selectedDate: string;
  selectedDate2: string;
  user: any;
  temp: any;
  toast: any;
  leaveRequest: any;
  users: any;
  obj: any;
  constructor(public router : Router , private http :HttpClient, public toastController: ToastController,) { 
    // const datePicker = document.getElementById('datePicker');
    document.addEventListener('DOMContentLoaded', function() {
      const datePicker = document.getElementById('datePicker');
      
      // Get the current date in the format YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Set the 'min' attribute to the current date
      datePicker.setAttribute('min', currentDate);
    });



     // Initialize the selectedDate with the current date
     const today = new Date();
     const year = today.getFullYear();
     const month = (today.getMonth() + 1).toString().padStart(2, '0');
     const day = today.getDate().toString().padStart(2, '0');
     this.selectedDate = `${year}-${month}-${day}`;
     this.selectedDate2 = `${year}-${month}-${day}`;
     const currentDate = `${year}-${month}-${day}`;
  
     this.type()
  }
  ionViewWillEnter() {
   
    // Get the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];

    // Set the 'min' attribute to the current date
    const datePicker = document.getElementById('datePicker') as HTMLInputElement;
    datePicker.setAttribute('min', currentDate);
  }
  




  
  dateChanged(event: any) {
    this.selectedDate = event.detail.value;
    console.log('', this.selectedDate);
    const datePicker = document.getElementById('datePicker') as HTMLInputElement;
    const selectedDate = datePicker.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDate < currentDate) {
      // Prevent selecting past dates
      datePicker.value = currentDate;
    }
  





  }
  
  date2Changed(event: any) {
    this.selectedDate2 = event.detail.value;
    console.log(this.selectedDate2)
    this.checkDateDifference();
    
  }

   date :any
  ngOnInit() {
  }

Request_leave(){
  this.show = false;
  this.hidd = true;
  this.leave_histoy() 
}

 Leave_balance(){
  this.show = true;
  this.hidd = false;

}

checkDateDifference() {
  if (this.selectedDate === this.selectedDate2) {
    console.log('1');
    this.Duration = true;
  } else {
    console.log('2');
     this.Duration2 = true;
     this.Duration = false;
  }
}


Submit(){

  if(window){
     
    if(this.User_details.FromDate == "" || 
        this.User_details.FromDate == "" ||
        this.User_details.ReasonOfLeave ==  ""
    
    ){

      this.toast = this.toastController
      .create({
        message: "Empty Fields",
        duration: 2000,
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
      });



    }else{
      var url = "https://techxpertindia.in/api/add_leave.php";

      return this.http.post(url,this.User_details ).subscribe((data)=>{
        console.log(data)
    
        this.user = data
        this.router.navigateByUrl("/vendor-new-page")
      })
    }


}
}




leave_show (){

  var url = "https://techxpertindia.in/api/add_leave.php";

  return this.http.post(url,this.User_details ).subscribe((data)=>{
    console.log(data)

    this.user = data
  })
}


type(){

  var api = "https://techxpertindia.in/api/get_leave_types.php"

  return this.http.get(api).subscribe((response)=>{

    console.log(response)

    this.temp = response
  })
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
