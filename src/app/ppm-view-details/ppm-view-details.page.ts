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
  selector: 'app-ppm-view-details',
  templateUrl: './ppm-view-details.page.html',
  styleUrls: ['./ppm-view-details.page.scss'],
})
export class PpmViewDetailsPage implements OnInit {
  // options: CameraOptions = {
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  // };

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
  serve: any;
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
  OTP_Genrate = {
    TicketID: '',
    TicketStatus: 'Generate OTP to Start',
    UpdatedBy: localStorage.getItem('workname'),
    AssignedTo: '',
    DueDate: '',
  };
  submit_For_closer: boolean;
  image: any;
  report_category: any;
  branch_assets_id: any;

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
    // this.advance_cost()
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {}

  detailsview() {
    this.Get();
  }

  Get() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
        this.OTP_Genrate.TicketID = params.BookingID;
        this.BookingID = params.BookingID;
        console.log(this.BookingID);
      }

      this.Getdata();
      // this.Service_status()
      // this.Asginchange()
    });
  }
  Getdata() {
    this.ngxService.start();

    var url = 'https://techxpertindia.in/api/get_ppm_ticket_detail.php';
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response;
        console.log(this.ID);
        this.ID = this.ID.data.ID;
        this.ID = localStorage.setItem('ID', this.ID);
        this.ID = localStorage.getItem('ID');
        // // alert(this.ID)
        this.Branch_Tickets_Id = response;
        this.Branch_Tickets_Id = this.Branch_Tickets_Id.data.BranchID;
        //  alert(this.Branch_Tickets_Id)
        this.Branch_Tickets_Id = localStorage.setItem(
          'branch_tickets_id',
          this.Branch_Tickets_Id
        );
        this.Branch_Tickets_Id = localStorage.getItem('branch_tickets_id');
        console.log(this.Branch_Tickets_Id);

        this.branch_assets_id = response;
        this.branch_assets_id = this.branch_assets_id.data.BranchAssetID;
        this.branch_assets_id = localStorage.setItem(
          'PPM_history_asseta_id',
          this.branch_assets_id
        );

        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact);
        this.temp = response;
        this.temp = this.temp.data.length;
        console.log(this.temp);

        if (this.temp == '0') {
          this.show = true;
        } else {
          this.show = false;
        }
        this.serve = response;
        this.serve = this.serve.data.Status;
        console.log(this.serve);

        if (this.serve == 'Work In Progress') {
          this.submit_For_closer = true;
          this.closer = false;
          this.Start_Work = false;
          this.Change_Ticket_Status = false;
        }

        if (this.serve == 'Closed') {
          this.closer = true;
          this.submit_For_closer = false;
          this.Start_Work = false;
          this.Change_Ticket_Status = false;
        }
        if (this.serve == 'Raised') {
          this.Change_Ticket_Status = true;
          this.closer = false;
          this.submit_For_closer = false;
          this.Start_Work = false;
        }
        if (this.serve == 'Assigned') {
          this.Start_Work = true;
          this.Change_Ticket_Status = false;
          this.closer = false;
          this.submit_For_closer = false;
        }

        this.date = response;
        this.date = this.date.data.DueDate;
        console.log(this.date);

        this.date = localStorage.setItem('Date', this.date);
        this.date = localStorage.getItem('Date');
        this.OTP_Genrate.DueDate = this.date;
        console.log(this.date);

        this.emp = response;
        this.emp = this.emp.data.AssignedTo;
        console.log(this.emp);
        this.emp = localStorage.setItem('empl_ID', this.emp);
        this.emp = localStorage.getItem('empl_ID');
        console.log(this.emp);
        this.OTP_Genrate.AssignedTo = this.emp;
        this.ngxService.stop();

        this.image = response;
        this.image = this.image.ticket_image;
        console.log(this.image);
        this.report_category = response;
        this.report_category = this.report_category.data.CategoryName;
        console.log('report :', this.report_category);
        this.report_category = localStorage.setItem(
          'report_category',
          this.report_category
        );
      });
  }

  route_to_profile_answer_screen(BookingID) {
    this.ngxService.start();
    this.BookingID = BookingID;
    console.log('BookingID:', this.BookingID); // Log the BookingID for debugging

    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID,
      },
    };

    this.router.navigate(['/ppm-assgine-status'], navigationExtras);
  }

  route_to_profile_pmm_submit(BookingID) {
    this.ngxService.start();
    this.BookingID = BookingID;
    console.log('BookingID:', this.BookingID); // Log the BookingID for debugging

    let navigationExtras: NavigationExtras = {
      queryParams: {
        BookingID: this.BookingID,
      },
    };

    this.router.navigate(['/ppm-submit-tickets'], navigationExtras);
  }
}
