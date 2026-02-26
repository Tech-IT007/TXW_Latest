import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ToastController,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ClintTicketsEditComponent } from '../clint-tickets-edit/clint-tickets-edit.component';

@Component({
  selector: 'app-branch-coporate-ticket-details',
  templateUrl: './branch-coporate-ticket-details.page.html',
  styleUrls: ['./branch-coporate-ticket-details.page.scss'],
})
export class BranchCoporateTicketDetailsPage implements OnInit {
  // options: CameraOptions = {
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  // };
Quatapprove_pending :boolean
  closer: boolean;
  row: boolean;
  water: boolean;
  emp: any;
  img = true;
  img2 = true;
  toast: any;
  role: any;
  tea = true;
  img22 = true;
  error: any;
  hide = false;
  temp: any;

  bookingdata: any = {
    BookingID: localStorage.getItem('ID'),
    BookingStatus: '',
    UpdatedBy: 'admin',
    AssignedTo: '',
  };

  dataTo = {
    imageData: '',
    TicketID: localStorage.getItem('ID'),
    CreatedBy: localStorage.getItem('username'),
    Action: 'pre_img',
  };

  cost = {
    TicketID: localStorage.getItem('ID'),
  };

  valid_cost: any;
  costly: boolean;
  message: any;

  status_services = {
    Pending: '',
    'In Progress': '',
  };

  Asgin = {
    Name: localStorage.getItem('role'),
    ID: localStorage.getItem('ID'),
  };

  services_data: any;
  use: any;
  otp: any;
  Branch_Tickets_Id: any;
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;
  profile: any;
  test_variable: any;
  ID: any;

  dataToSend = {
    TicketID: localStorage.getItem('ID'),
  };

  BookingID: any;
  impact: any = {};
  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
  deo: any;
  status: any;
  button = false;
  date: any;
  show = false;
  isButtonDisabled11: boolean;
  add = false;
  clickedImage: string;
  isButtonDisabled22: boolean;
  add2: boolean;
  clicked: string;
  isButtonDisabled33: boolean;
  clickedd: string;
  open3: boolean;
  open4: boolean;
  rol: string;
  Start_Work: boolean;
  Change_Ticket_Status: boolean;
  Quation_approve : boolean
  OTP_Genrate = {
    TicketID: '',
    TicketStatus: 'Generate OTP to Start',
    UpdatedBy: localStorage.getItem('workname'),
    AssignedTo: '',
    DueDate: '',
  };

  submit_For_closer: boolean;
  image: any;
  status_type: any;
  AMC_status: boolean;
  R_M_status: boolean;
  approvel: any;
  AMC_approvel_status: boolean;
  R_M_approvel_status: boolean;
  Raised_app: boolean;
  serve_status: any;
  Raised_open: boolean;
  not_approvel: boolean;
  check_update: boolean;

  clint_check_list = {
    TicketID: '',
  };
  history: boolean;
  Branch_Tickets_history_id: any;
  DPR: boolean;
  catgory_id: any;
  catgory_name: any;
  TicketQuotationID: any;
  TicketQuotationLocal_id: any;
  Create_Quotation: boolean;
  companyid: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public popoverController: PopoverController,
    // private camera: Camera,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();
    this.role = localStorage.getItem('role');

  }

  ngOnInit() {}

  detailsview() {
    this.Get();
    this.check_employee_list();
  }

  Get() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);

      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
        this.OTP_Genrate.TicketID = params.BookingID;
        this.clint_check_list.TicketID = params.BookingID;
        this.BookingID = params.BookingID;
        console.log(this.BookingID);
      }

      this.Getdata();
    });
  }

Getdata() {
  this.ngxService.start();

  const url = 'https://techxpertindia.in/api/get_corporate_ticket_detail.php';
  this.http
    .post(url, this.dataToSend, {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
    })
    .subscribe((response: any) => {
      console.log(response);

      this.ID = response.data.ID;
      localStorage.setItem('ID', this.ID);

      this.Branch_Tickets_Id = response.data.BranchID;
      localStorage.setItem('branch_tickets_id', this.Branch_Tickets_Id);
    this.Branch_Tickets_history_id = response.data.BranchAssetID;
      localStorage.setItem('branch_tickets_history_id', this.Branch_Tickets_history_id);
      this.impact = response.data;
    



    this.catgory_id = response.data.Category
     localStorage.setItem("catgory_id ",this.catgory_id)
  // alert(this.catgory_id)
   this.catgory_name = response.data.CategoryName
   localStorage.setItem("CategoryName",this.catgory_name)
      this.temp = this.impact?.length || 0;

      this.show = this.temp === 0;

      this.status = response.data.Status;
      this.status_type = response.data.Type;
      console.log(this.status_type);

      this.approvel = response.data.QuoteApproved;
      console.log(this.approvel);
    this.companyid = response.data.CompanyID
    localStorage.setItem("Company_id",this.companyid)
      if (this.approvel == '0') {
        this.not_approvel = true;
        this.Start_Work = false;
      } else {
        this.not_approvel = false;
      }

      this.date = response.data.DueDate;
      localStorage.setItem('Date', this.date);
      this.OTP_Genrate.DueDate = this.date;

      this.emp = response.data.AssignedTo;
      localStorage.setItem('empl_ID', this.emp);
      this.OTP_Genrate.AssignedTo = this.emp;
     this.TicketQuotationID = response.data.TicketQuotationID
     this.show_qutions_status.QuotationID = this.TicketQuotationID
      // reset flags
      this.Change_Ticket_Status = false;
      this.Start_Work = false;
      this.closer = false;
      this.submit_For_closer = false;
      this.AMC_approvel_status = false;

      // ✅ Conditions
      if (this.status === 'Work In Progress') {
        this.submit_For_closer = true;
        this.check_update = false;
      } else if (this.status === 'Closed') {
        this.check_update = false;
            
        this.submit_For_closer = false;

        this.closer = true;
      } else if (this.status === 'Raised') {
        this.check_update = false;
        
       this.submit_For_closer = false;
        this.Change_Ticket_Status = true;
      } else if (this.status === 'Quote Approved') {
        this.check_update = false;
            
      this.submit_For_closer = false;
        this.Start_Work = true;
      }

      // ✅ New condition for AMC type
   if (this.status_type === 'AMC' && this.status === 'Assigned') {
  this.Start_Work = true;
       this.check_update = false;
     this.submit_For_closer = false;     
  this.not_approvel = false; // skip approval if AMC Assigned
     this.Create_Quotation = false
}

if (this.status_type === 'AMC'){
 this.history = true 
  
}
    this.questions_status ()
      this.ngxService.stop();
    });
}

  check_employee_list() {
    var api =
      'https://techxpertindia.in/api/get_technician_safety_check_status.php';
    return this.http.post(api, this.dataToSend).subscribe((response) => {
      console.log(response);
      this.error = response;
      this.error = this.error.error;

      if (this.error == false) {
        this.check_update = true;
      }
    });
  }

  Service_Change_Status() {
    this.ngxService.start();

    var url = 'https://techxpertindia.in/api/change_booking_status.php';
    return this.http.post(url, this.bookingdata).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.obj = this.users;

      let navigationExtras: NavigationExtras = {
        queryParams: { BookingID: this.BookingID },
      };
      this.router.navigate(['rocket'], navigationExtras);
      this.ngxService.stop();
    });
  }

  route_to_profile_answer_screen(BookingID) {
    this.ngxService.start();
    this.BookingID = BookingID;
    console.log('BookingID:', this.BookingID);

    let navigationExtras: NavigationExtras = {
      queryParams: { BookingID: this.BookingID },
    };

    console.log('Role:', this.role);

    let rolesArray = this.role.split(',');

    if (rolesArray.includes('City Lead')) {
      this.ngxService.stop();
    } else if (
      rolesArray.includes('Technician') ||
      rolesArray.includes('Vendor')
    ) {
      if (this.status_type == 'Supply') {

    var api ="https://techxpertindia.in/api/change_ticket_status.php"
        return this.http.post(api, this.OTP_Genrate).subscribe((data) => {
          console.log(data);
           this.router.navigate(['/verfication-otp'], navigationExtras);
               this.ngxService.stop();
        });
      } else {
        this.router.navigate(['/entry-checklist'], navigationExtras);
      }
      this.ngxService.stop();
    } else {
      // this.router.navigate(['/corpate-status'], navigationExtras);
    }
    this.ngxService.stop();
  }

  route_to_profile_closer(BookingID) {
    this.ngxService.start();
    this.BookingID = BookingID;

    let navigationExtras: NavigationExtras = {
      queryParams: { BookingID: this.BookingID },
    };
    this.router.navigate(['/technician'], navigationExtras);
  }

  

show_qutions_status = {
 QuotationID: "",
}
questions_status() {
  const api = 'https://techxpertindia.in/api/get_quotation_status.php';

  this.http.post(api, this.show_qutions_status).subscribe(
    (response: any) => {
      console.log(response);

      // FORCE convert to number
      this.TicketQuotationLocal_id = Number(response?.TicketQuotationID);

      // Reset flags
      this.Create_Quotation = false;
      this.Quatapprove_pending = false;

      // MAIN LOGIC
      if (this.status === 'Assigned' && this.TicketQuotationLocal_id === -1) {
        this.Create_Quotation = true;
      } 
      else if (
        this.status === 'Assigned' && this.TicketQuotationLocal_id > 0
      ) {
        this.Quatapprove_pending = true;
      }
    },
    error => console.error(error)
  );
}


}


















