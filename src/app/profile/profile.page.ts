import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController, AlertController, ModalController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { error } from "console";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
statu : any 
serve: any;
button = false
  status_hide : boolean ;
  toast: any;
  temp: any;
  approvel_data = {
  "BookingCode": "",
  "LeadID":  localStorage.getItem("EmployeeID"),
  };
  bookingdata: any = {
    BookingID: localStorage.getItem("ID"),
    BookingStatus: "",
    UpdatedBy: "admin",
    AssignedTo: "",
  };
  Start_work:boolean;
  complet_work :boolean; 
  message: any;
  status_services = {
    Pending: "",
    "In Progress": "",
  };
  Asgin = {
    Name: localStorage.getItem("role"),
    ID: localStorage.getItem("ID")
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
   BookingCode: ""
  }

  BookingID: any;

  impact: any = {};
status :any
  book: string;
  users: any;
obj: any[] = [];             
filteredTechnicians: any[] = [];
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
show = false;
 self = true
  role: any;
  WIP: boolean;
  isAssignModalOpen: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
      private alertController: AlertController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
  ) {
    this.detailsview();
  }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.role)
  }
  detailsview() {
    this.Get()

  }
  Asgin_data = {
    BookingID :localStorage.getItem("ID")
  };
  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.BookingCode = params.BookingID;

        this.BookingID = params.BookingID
        this.approvel_data.BookingCode = this.BookingID
        console.log(this.BookingID)

      }

      this.Getdata();
  
    })
  }
  Getdata() {
    

    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
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
       
        this.impact = response;
        this.impact = this.impact.booking;
        console.log(this.impact)
        if(this.temp == "0"){
          this.show = true 
        
        }else{
          this.show = false
        }
        this.serve = response 
        this.serve = this.serve.data.Status
        console.log(this.serve)
       this.serve = localStorage.setItem("Status_value",this.serve)
       this.serve = localStorage.getItem("Status_value")   
         
        if(this.serve === "Closed" ){
          this.button = false;
          this.complet_work = true;
          this.Start_work = false;
          this.WIP = false;
        }else{
          this.button = true;
          this.Start_work = true;
          this.complet_work = false;
          this.WIP = false;
        }
        if(this.serve == "Work In Progress"){
         this.WIP = true;
        this.complet_work = false;
        this.Start_work = false
        }




      });
      
    }, 100);
  }


  route_to_profile_answer_screen(BookingID) {
    this.BookingID = BookingID;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }


    if (this.role == "Vendor" || this.role == "Technician") {
      this.router.navigate(['verified-home-care'], navigationExtras);
  
    } else {
    //  this.tea = false;
    //   this.hide = true;
      this.router.navigate(['assig-page'], navigationExtras);
  
  
    }
   
  }


  route_to_profile(BookingID) {
    this.BookingID = BookingID;
    console.log(this.BookingID)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID
      }
    }



      this.router.navigate(['assig-page'], navigationExtras);
  
  
    
   
  }


isApproved: boolean = false;

async approve() {

  const loader = await this.loadingCtrl.create({
    message: 'Approving ticket...',
    spinner: 'crescent'
  });

  await loader.present();

  const api = 'https://techxpertindia.in/api/booking_accept.php';

  this.http.post(api, this.approvel_data).subscribe({
    next: async (res: any) => {
      console.log(res);

      await loader.dismiss();

      this.isApproved = true; // ✅ SHOW ASSIGN TECH BUTTON

      const toast = await this.toastController.create({
        message: 'Ticket approved. Please assign a technician.',
        duration: 2000,
        color: 'success'
      });
      this.notify()
      toast.present();
    },

    error: async () => {
      await loader.dismiss();
    }
  });
}

openAssignModal() {
  this.isAssignModalOpen = true;
  this.Asginchange(); // 🔥 load technician list
}

Asginchange() {
  const url = 'https://techxpertindia.in/api/get_assigned_to_list.php';

  this.http.post(url, this.Asgin).subscribe((res: any) => {
    this.obj = res.data || [];
    this.filteredTechnicians = [...this.obj];
  });
}

filterTechnicians(event: any) {
  const value = event.target.value?.toLowerCase() || '';

  this.filteredTechnicians = this.obj.filter(item =>
    item.Name.toLowerCase().includes(value)
  );
}

selectTechnician(user: any) {
  this.bookingdata.AssignedTo = user.ID;

  console.log('Selected:', user);

  this.closeAssignModal();
}


closeAssignModal() {
  this.isAssignModalOpen = false;
}

async assignTechnician() {
  // 1️⃣ Check if a technician is selected
  if (!this.bookingdata.AssignedTo) {
    const toast = await this.toastController.create({
      message: 'Please select technician',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    return;
  }

  // 2️⃣ Show confirmation alert
  const alert = await this.alertController.create({
    header: 'Confirm Assignment',
    message: 'Are you sure you want to assign this technician?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Yes, Assign',
        handler: async () => {
          // 3️⃣ Show loader while API runs
          const loader = await this.loadingCtrl.create({
            message: 'Assigning technician...',
            spinner: 'crescent'
          });
          await loader.present();

          // 4️⃣ Prepare API payload
          const api = 'https://techxpertindia.in/api/assign_technician_booking.php';
          const payload = {
            BookingCode: this.impact.BookingCode,
            LeadID: localStorage.getItem('EmployeeID'),
            TechnicianID: this.bookingdata.AssignedTo
          };

          // 5️⃣ Call API
          this.http.post(api, payload).subscribe({
            next: async (res: any) => {
              await loader.dismiss();

              // ✅ Show success toast
              const toast = await this.toastController.create({
                message: 'Technician assigned successfully',
                duration: 1500,
                color: 'success'
              });
              toast.present();
               this.notify()
              // ✅ Close modal properly
              this.modalController.dismiss();
              
              // ✅ Navigate after short delay
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 300);
            },
            error: async () => {
              await loader.dismiss();
              const toast = await this.toastController.create({
                message: 'Network or server error',
                duration: 2000,
                color: 'danger'
              });
              toast.present();
            }
          });
        }
      }
    ]
  });

  await alert.present();
}

  notify() {
    var api = "https://techxpertindia.in/api/process_notifications.php"
    return this.http.get(api).subscribe((res)=>{
      console.log(res)
    })

  }

}

























































