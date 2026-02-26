

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationExtras, PreloadAllModules, Router, } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxOtpInputModule, NgxOtpInputConfig, } from 'ngx-otp-input';
// import { ToastrService } from 'ngx-toastr';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-opt-submit',
  templateUrl: './opt-submit.page.html',
  styleUrls: ['./opt-submit.page.scss'],
})
export class OptSubmitPage implements OnInit {
  config = {
    length: 4,
    allowNumbersOnly: true
  }
  timingIsOver: boolean = false;
  resend: boolean = true
  button: boolean = true
  hide = false
tea = true
BookingID: any;
bookingdata: any = {
  TicketID: localStorage.getItem("ID"),
  TicketStatus: "",
  UpdatedBy: "admin",
  AssignedTo: localStorage.getItem("empl_ID"),
  DueDate: localStorage.getItem("Date"),
  // Quotation: ""
  // "CallType":"Custumprice",
  // "ExpnsePrice":"Description",

};
  login_authentication: any;
  users: any ;
  obj: any;
  emp: any;
  count: number = 10;

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

  OTP_Genrate = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "Generate OTP to Close",
    UpdatedBy: localStorage.getItem("workname"),
    AssignedTo: localStorage.getItem("empl_ID"),
    DueDate: localStorage.getItem("Date"),
  }


  dataRecieved: any;
  toast: any;
  nextElement: any;
  testvar: any;
  userId: any;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp: any;

  constructor(

    private route: ActivatedRoute,
    private http: HttpClient,
    public api: ApiService,
    public toastController: ToastController,
     private ngxService:NgxUiLoaderService,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.emp  = localStorage.getItem("empl_ID")
    console.log(this.emp)


  }


  user: any;


  userdetails = {
    "TicketID":  localStorage.getItem("ID"),
    "TicketCloseOTP": localStorage.getItem("otp"),
    "otp1": "",
    "otp2": "",
    "otp3": "",
    "otp4": "",
  }
  final_otp: any

  print: any;
  ngOnInit() {
    this.startCountdown()
    this.user = localStorage.getItem("phonenumber");
    console.log(this.user)
    setTimeout(() => {
      this.timingIsOver = true;
      this.resend = false
      this.button = false

    }, 60000);

  }

submit() {
  //  this. hide = true
  //  this. tea = false
this.ngxService.start()

    if (this.otp) {
      this.toast = this.toastController

    }

    else {
      this.final_otp = parseInt(this.userdetails.otp1) * 1000 + parseInt(this.userdetails.otp2) * 100 + parseInt(this.userdetails.otp3) * 10 + parseInt(this.userdetails.otp4);
      // this.final_otp = (this.final_otp).toString();
      this.userdetails.TicketCloseOTP = this.final_otp;


      var url =
        "https://techxpertindia.in/api/verify_ticket_close_otp.php";
      console.log(this.userdetails);


      return this.http
        .post(url, this.userdetails, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((reponse) => {
          console.log(reponse);
          this.login_authentication = reponse
          this.login_authentication = this.login_authentication.error
          console.log(this.login_authentication);
          this.final_otp = localStorage.setItem("otp", this.final_otp)
          console.log(this.final_otp)
         this.launchConfetti()
          let navigationExtras: NavigationExtras = {
            queryParams: {
              userId: this.userId,
            },
          };
          if (this.login_authentication === false) {
            this.toast = this.toastController
              .create({
                message: "LoginSuccessful!",
                duration: 2000,
              })
              .then((toastData) => {
                console.log(toastData);
                toastData.present();
              });
       
            this.router.navigate(["/corprate-tickets"],);
            this.ngxService.stop()
          }
          else {
            this.ngxService.start()
            this.toast = this.toastController
              .create({
                message: "SomeThing Want Wrong!",
                duration: 2000,
              })
              .then((toastData) => {
                console.log(toastData);
                toastData.present();
              });




            this.router.navigate(["/corprate-tickets"],);
          }

          this.ngxService.stop()
        });
    
    }
  }




  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');

    if (length == maxlength) {
      if (n != "") {
        n.focus()
      }

    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus()
      }

    }
  }
  resend_otp(){
    this.timingIsOver = false;
    this.resend = true;
    this.button = true;
    this.startCountdown()
    var url =  "https://techxpertindia.in/api/change_ticket_status.php";
    return this.http.post(url , this.OTP_Genrate).subscribe((data)=>{
      console.log(data)
    })
  }
  startCountdown() {
    this.count = 60;
    this.decrementCount();
  }

  decrementCount() {
    if (this.count > 0) {
      setTimeout(() => {
        this.count--;
        this.decrementCount();
      }, 1000);
    }
  }
    launchConfetti() {
    const duration = 2 * 1000; // 2 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}


















