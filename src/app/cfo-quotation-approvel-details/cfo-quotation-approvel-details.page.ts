
import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
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
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-cfo-quotation-approvel-details',
  templateUrl: './cfo-quotation-approvel-details.page.html',
  styleUrls: ['./cfo-quotation-approvel-details.page.scss'],
})
export class CfoQuotationApprovelDetailsPage implements OnInit {

  @ViewChild('barChart1Canvas') barChart1Canvas!: ElementRef;
@ViewChild('barChart2Canvas') barChart2Canvas!: ElementRef;
@ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;
@ViewChild('profitChartCanvas') profitChartCanvas!: ElementRef;
@ViewChild('balanceChartCanvas') balanceChartCanvas!: ElementRef;
// Charts
barChart1: any;
barChart2: any;
pieChart: any;
profitChart: any;
balanceChart: any;

// Calculated values
profitValue: number = 0;
profitPercent: number = 0;
totalExpense: number = 0;
profitLoss: number = 0;
profitAmount: number = 0;
lossAmount: number = 0;
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
    TicketID: localStorage.getItem('Ticket_id'),
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
  
  barcode = {
    TicketID: localStorage.getItem('ID'),
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
dasboard_data = {
  TicketID: localStorage.getItem('Ticket_id'),  
}
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
    this.loadStats();

  }

  Get() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);

      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
        // alert(this.dataToSend.TicketID);
        this.OTP_Genrate.TicketID = params.BookingID;
        this.clint_check_list.TicketID = params.BookingID;
        this.BookingID = params.BookingID;
        this.dasboard_data.TicketID = params.BookingID;

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
      this.impact = response.data;
    
      this.temp = this.impact?.length || 0;

      this.show = this.temp === 0;


      this.ngxService.stop();
    });
}


Approvel_Ticket() {

  this.ngxService.start();

  const api = 'https://techxpertindia.in/api/get_corporate_ticket_detail.php';

  this.http.post(api, this.dataToSend, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  })
  .subscribe((response: any) => {

    const data = response.data;

    if (!data) {
      this.ngxService.stop();
      return;
    }

    // ✅ Encode separately
    const quotationID = btoa(data.TicketQuotationID);
    const employeeID = btoa(localStorage.getItem("EmployeeID") || "");
    const branchState = btoa(data.BranchState);
    const stateApproval = btoa(localStorage.getItem("IsStateApprove") || "");
    const financeApproval = btoa(localStorage.getItem("IsFinanceApprove") || "");

    // ✅ NEW PARAM (CFO)
    const isCfo = btoa("Yes");

    const finalUrl =
      `https://techxpertindia.in/admin/corporate-tickets/view-web-quotation-approval.php?` +
      `QuotationID=${quotationID}` +
      `&EmployeeID=${employeeID}` +
      `&BranchState=${branchState}` +
      `&IsStateApproval=${stateApproval}` +
      `&IsFinanceApproval=${financeApproval}` +
      `&IsCfo=${isCfo}`;

    this.ngxService.stop();

    window.open(finalUrl, "_blank");

  }, (err) => {
    this.ngxService.stop();
    console.error(err);
  });

}
loadStats() {

  const api = "https://techxpertindia.in/api/get_tickets_stats.php";

  this.http.post(api, this.dasboard_data).subscribe((res: any) => {

    if (!res.data) return;

    const d = res.data;

    const customerPrice = Number(d.CustomerPrice || 0);
    const internalCost = Number(d.InternalCost || 0);
    const expectedBudget = Number(d.ExpectedBudget || 0);
    const totalPaymentDone = Number(d.TotalPaymentDone || 0);

    this.createCharts(
      customerPrice,
      internalCost,
      expectedBudget,
      totalPaymentDone
    );
  });
}
createCharts(cp: number, ic: number, eb: number, pay: number) {

  /* ===== DESTROY OLD ===== */
  if (this.barChart1) this.barChart1.destroy();
  if (this.barChart2) this.barChart2.destroy();
  if (this.pieChart) this.pieChart.destroy();
  if (this.profitChart) this.profitChart.destroy();
  if (this.balanceChart) this.balanceChart.destroy();


  /* ===== GRAPH 1 ===== */
  this.barChart1 = new Chart(this.barChart1Canvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Sales Price', 'Expense Cost', 'Expected Budget'],
      datasets: [{
        data: [cp, ic, eb],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });


  /* ===== GRAPH 2 ===== */
  this.barChart2 = new Chart(this.barChart2Canvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Total Payment Done'],
      datasets: [{
        data: [pay],
        backgroundColor: ['#673AB7']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });


  /* ===== PIE ===== */
  this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
    type: 'pie',
    data: {
      labels: ['Expense Cost', 'Expected Budget'],
      datasets: [{
        data: [ic, eb],
        backgroundColor: ['#2196F3', '#FF9800']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });


  /* ===== PROFIT % ===== */
  const profit = cp - eb;
  const profitPercent = cp ? (profit / cp) * 100 : 0;

  this.profitValue = profit;
  this.profitPercent = profitPercent;

  this.profitChart = new Chart(this.profitChartCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Profit %'],
      datasets: [{
        data: [profitPercent],
        backgroundColor: [profit >= 0 ? '#4CAF50' : '#F44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: any) => ctx.raw.toFixed(2) + '%'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (v: any) => v + '%'
          }
        }
      }
    }
  });


  /* ===== BALANCE SHEET ===== */

  // ✅ CORRECT EXPENSE CALCULATION
  this.totalExpense = eb - ic; ;

  this.profitLoss = cp - this.totalExpense;

  this.profitAmount = this.profitLoss > 0 ? this.profitLoss : 0;
  this.lossAmount = this.profitLoss < 0 ? Math.abs(this.profitLoss) : 0;

  this.balanceChart = new Chart(this.balanceChartCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Income', 'Total Expense', this.profitLoss >= 0 ? 'Profit' : 'Loss'],
      datasets: [{
        data: [cp, this.totalExpense, Math.abs(this.profitLoss)],
        backgroundColor: [
          '#4CAF50',
          '#FF9800',
          this.profitLoss >= 0 ? '#2E7D32' : '#F44336'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: any) => '₹ ' + ctx.raw.toLocaleString()
          }
        }
      },
      scales: { y: { beginAtZero: true } }
    }
  });

}


}

























