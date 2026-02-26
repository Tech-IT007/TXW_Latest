import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tickets-convence-charge',
  templateUrl: './tickets-convence-charge.page.html',
  styleUrls: ['./tickets-convence-charge.page.scss'],
})
export class TicketsConvenceChargePage implements OnInit {
temp : any;
  items: string[] = ['',];
  dataToSend : any =  {
    "EmployeeID":localStorage.getItem("EmployeeID"),
    "ConvenienceFrom":"",
    "ConvenienceTo":"",
    "ConvenienceAmount":"",
    "ConvenienceDate" :"",
    "Reference" : "",
    "CreatedBy": localStorage.getItem("workname"),
    TicketID: localStorage.getItem('ID'),
  }
  toast: any;
  addNewItem() {
    const newItem = `Item ${this.items.length + 1}`;
    this.items.push(newItem);
  }
  currentDate: any;
  constructor(private datePipe: DatePipe , private http : HttpClient ,
    public router: Router,private ngxService: NgxUiLoaderService,   public toastController: ToastController,
    
    ) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   this.dataToSend.ConvenienceDate = this.currentDate
   console.log(this.dataToSend)
   console.log(this.currentDate)
  }


  ngOnInit() {
  //   this.initializeDateInput()
  }

  submit(){
    if  (window){
  if(this.dataToSend.ConvenienceFrom == "" || 
      this.dataToSend.ConvenienceTo == "" ||
      this.dataToSend.ConvenienceAmount == ""||
    this.dataToSend.Reference == ""
  
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
    this.ngxService.start()
    var url = "https://techxpertindia.in/api/add_employee_convenience.php"
    return this.http.post(url, this.dataToSend).subscribe((data) => {
      console.log(data);
      this.temp = data
      this.temp = this.temp.InTimeStatus
      console.log(this.temp)
      this.ngxService.stop()
     this.router.navigateByUrl("/cop-current-tickets")

    });
  }
   
  
  }
  }

  // initializeDateInput() {
  //   // Get the date input element by its id.
  //   const dateInput = document.getElementById('dateInput') as HTMLInputElement;

  //   // Function to set the minimum date as the current date.
  //   function setMinDate() {
  //     const currentDate = new Date().toISOString().split('T')[0];
  //     dateInput.min = currentDate;
  //   }

  //   // Call setMinDate initially to set the minimum date.
  //   setMinDate();

  //   // Add an event listener to dynamically update the minimum date.
  //   dateInput.addEventListener('input', setMinDate);
  // }


}





