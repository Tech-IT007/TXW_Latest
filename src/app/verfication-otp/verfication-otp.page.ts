

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationExtras, PreloadAllModules, Router, } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxOtpInputModule, NgxOtpInputConfig, } from 'ngx-otp-input';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verfication-otp',
  templateUrl: './verfication-otp.page.html',
  styleUrls: ['./verfication-otp.page.scss'],
})
export class VerficationOtpPage implements OnInit {
  config = {
    length: 4,
    allowNumbersOnly: true
  }
  timingIsOver: boolean = false;
  resend: boolean = true

  button: boolean = true

  hide = false
tea = true





  login_authentication: any;
  acountbranchno: string;
  acountbranchmanager: string;


  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
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

this.acountbranchno = localStorage.getItem('accountBranchNo');
this.acountbranchmanager = localStorage.getItem('accountBranchManager');

  }


  user: any;

  count: number = 10;
  userdetails = {
    "TicketID":  localStorage.getItem("ID"),
    "TicketOTP": localStorage.getItem("otp"),
    "otp1": "",
    "otp2": "",
    "otp3": "",
    "otp4": "",
  }
  final_otp: any
  OTP_Genrate = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "Generate OTP to Start",
    UpdatedBy: localStorage.getItem("workname"),
    AssignedTo: localStorage.getItem("empl_ID"),
    DueDate: localStorage.getItem("Date"),
  }
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

  // move(fromtext, totxt) {
  //   var length = fromtext.length;
  //   var maxlength = fromtext.getAttribute(maxlength)
  //   if (length == maxlength) {
  //     totxt.focus();
  //   }
  //   if(totxt === "backspace"){
  //     totxt.focus();
  //   }
  // }


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
      this.userdetails.TicketOTP = this.final_otp;


      var url =
        "https://techxpertindia.in/api/verify_ticket_otp_v2.php";
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

            this.router.navigate(["/technician"],);
            this.ngxService.stop()
          }
          else {
            this.ngxService.start()
            this.toast = this.toastController
              .create({
                message: "User not validated! Either the OTP is expired or incorrect!",
                duration: 2000,
              })
              .then((toastData) => {
                console.log(toastData);
                toastData.present();
              });




            this.router.navigate(["/verfication-otp"],);
          }

          // this.router.navigate(["home"],);
          this.ngxService.stop()
        });
    
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

  // resend_otp() {

  //   // window.location.reload()




  //   this.ngxService.start()


  
  //   this.toast = this.toastController
  //     .create({
  //       message: "Kindly Enter the OTP sent to your phone number on whatsapp",
  //       duration: 2000,
  //     })
  //     .then((toastData) => {
  //       console.log(toastData);
  //       toastData.present();
  //     });
  //   var url =
  //     "https://techxpertindia.in/api/generate_otp.php";
   
  //   console.log("Kindly Enter the OTP sent to your phone number on whatsapp");

  //   return this.http
  //     .post(url, this.userdetails, {
  //       headers: new HttpHeaders({ "content-Type": "application/json" }),
  //     })
  //     .subscribe((reponse) => {
  //       console.log(reponse);
  //       this.testvar = reponse;
  //       if (this.testvar.error !== false || this.testvar == "") {
  //         alert(
  //           "Form not submitted due to some technical error pls try again!"
  //         );
  //       }
  //       let navigationExtras: NavigationExtras = {
  //         queryParams: {
  //           userId: this.userId,
  //         },
  //       };
  //       // this.router.navigate(["fogotpassword"],);
  //       window.location.reload()
  //       this.ngxService.start()
  //     });
  //   window.location.reload()


  // }



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
}

