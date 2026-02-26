import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { el } from "@fullcalendar/core/internal-common";


@Component({       
  selector: 'app-assig-page',
  templateUrl: './assig-page.page.html',
  styleUrls: ['./assig-page.page.scss'],
})
export class AssigPagePage implements OnInit {
  toast: any;
  temp: any;
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
    // DueDate : localStorage.getItem("Date")
  };
  bookingdata1: any = {
   BookingCode: localStorage.getItem("BookingCode"),
  };

  message: any;
  status_services = {
    Pending: "",
    "In Progress": "",
  };
  Asgin = {
    BookingID :localStorage.getItem("ID")
  };
  services_data: any;

  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;

  test_variable: any;
  ID: any;
  dataToSend = {
    BookingCode: localStorage.getItem("BookingCode"),
  }
  status : Boolean = false;
  hidden: Boolean = false;
  BookingID: any; 
  assinto : any
  impact: any = {};
  selectedValue: any;
  book: string;
  users: any;
  obj: any;
  data: any;
  submit1 :boolean;
  submit2 :boolean;
  postdata: any;
  profilepage: number;
  Complet_value:boolean;
  Assigned_value : boolean;
    status_ :any;
  assin: any;
  close = false;
  date = false;
  open = false;
  role :any; 
  rol :any;
show = false
  status_Assigned: boolean;
  status_other: boolean = true;
  closer = {
    "BookingID":267,
    "BookingCloseOTP":"9613",
    "UpdatedBy":"admin"
  }
  Status_show: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    private ngxService: NgxUiLoaderService,
  ) {
    this.detailsview();
    this.bookingdata.BookingStatus = "Assigned"
  }

  assignto :any;

  ngOnInit() {

 this.status_ = localStorage.getItem("Status_value")   
 if(this.status_ == "Pending"){
   this.Assigned_value  = true;
this.submit1 = true;
this.submit2 = false;
   this.Complet_value = false
  
 }else{
  this.Assigned_value = false;
  this.Complet_value = true;
  this.submit1 = false;
  this.submit2 = true ;
 }



    this.role = localStorage.getItem("role")
    console.log(this.role)
    if (this.role == "Vendor" || this.role == "Technician") {
      this.date = false

    } else {
      this.date = true
    }

   
    this.role = localStorage.getItem("role")
     console.log(this.role)
     if(this.role == "Vendor" || this.role == "Technician"){
     this.close = false
    
     }else{
      this.close = true
     }

     if(this.role == "Vendor" || this.role == "Technician"){
      this.open = true

     }
     else{
      this.open = false
     }

   }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
    

        this.BookingID = params.BookingID
        console.log(this.BookingID)
        this.dataToSend.BookingCode = this.BookingID
        this.bookingdata1.BookingCode = this.BookingID
      }

      this.Getdata();
      this.Service_status()
      this.Asginchange()
    })
  }
  Getdata() {
    var url = "https://techxpertindia.in/api/my_homecare_booking_ticket_details_by_booking_code.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response
        console.log(this.ID)
        this.ID = this.ID.booking.ID
        this.ID = localStorage.setItem("ID", this.ID)
        this.ID = localStorage.getItem("ID")
        // alert(this.ID)
        this.impact = response;
        this.impact = this.impact.booking;
        console.log(this.impact);

        this.temp = response
        this.temp = this.temp.data.length
        console.log(this.temp)
        
        if(this.temp == "0"){
          this.show = true 
        
        }else{
          this.show = false
        }
         this.rol = response
         this.rol = this.rol.data.AssignedTo

         this.bookingdata.AssignedTo = this.rol
          
         this.Status_show = response;
         this.Status_show = this.Status_show.data.AssignedTo
         
          this.bookingdata1.AssignedTo = this.Status_show
      console.log(this.rol)
       
      });
  }


  Asginchange() {
    var url = "https://techxpertindia.in/api/get_assigned_to_list.php";
    return this.http.post(url, this.Asgin).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users.data;
      console.log(this.obj);
      this.assin = data
   this.assin = this.assin.data
   console.log(this.assin)
       
    });
  }
  Service_status() {
    var url = "https://techxpertindia.in/api/get_booking_status.php";
    return this.http.post(url, this.status_services).subscribe((services_data) => {
      console.log(services_data);
      this.temp = services_data
      this.obh = this.temp.data;
      console.log(this.obh);
      this.temp = services_data
      this.temp =  this.temp.data
    
      console.log(this.obh);
    
      console.log(this.temp)
    });
  }




  Service_Change_Status() {
    if (window) {
      if(this.bookingdata.BookingStatus == "" ||
          
          this.bookingdata.AssignedTo == ""
    
          ){
            this.toast = this.toastController
            .create({
              message: "Please Enter All Your  Details",
              duration: 2000,
            })
            .then((toastData) => {
              console.log(toastData);
              toastData.present();
            });
          }else{

        
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/change_booking_status.php";
    return this.http.post(url, this.bookingdata).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users;
      
      console.log(this.obj);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          BookingID: this.BookingID
        }
      }
      this.router.navigate(["/home"],);
    });
  },);
}
}
  }

 
  Service_Change_Status2() {
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/close_otp_booking_services.php";
    return this.http.post(url, this.bookingdata1).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users;
      
      console.log(this.obj);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          BookingID: this.BookingID
        }
      }
      this.router.navigate(["/home-verfied-opt"],);
    });
  },);
  

  }

  onSelectChange(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
   if(this.selectedValue){
    this.status_Assigned   = true; 
   
   }
  
  
  }



 submit_closer (){
   var api = "https://techxpertindia.in/api/verify_home_care_booking_otp_for_closure.php"
   
   return this.http.post(api,this.closer).subscribe((data)=>{
    console.log(data)
   })
 }








 route_to_profile_answer_screen(BookingID) {
  this.BookingID = BookingID;
  console.log(this.BookingID)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      BookingID: this.BookingID
    }
  }


  this.router.navigate(['home-verfied-opt'], navigationExtras);
 
}

  
}





























































