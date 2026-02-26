import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationExtras, PreloadAllModules, Router, } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxOtpInputModule, NgxOtpInputConfig, } from 'ngx-otp-input';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-verfied-opt',
  templateUrl: './home-verfied-opt.page.html',
  styleUrls: ['./home-verfied-opt.page.scss'],
})
export class HomeVerfiedOptPage implements OnInit {
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



  }


  user: any;


  userdetails = {
    "BookingCode":localStorage.getItem("BookingCode"),
    "Otp": localStorage.getItem("otp"),
    "otp1": "",
    "otp2": "",
    "otp3": "",
    "otp4": "",
    "UpdatedBy":"admin",
  }
  final_otp: any

  print: any;
  ngOnInit() {


  }



  submit() {
this.ngxService.start()

    if (this.otp) {
      this.toast = this.toastController

    }

    else {
      this.final_otp = parseInt(this.userdetails.otp1) * 1000 + parseInt(this.userdetails.otp2) * 100 + parseInt(this.userdetails.otp3) * 10 + parseInt(this.userdetails.otp4);
      // this.final_otp = (this.final_otp).toString();
      this.userdetails.Otp = this.final_otp;


      var url =
        "https://techxpertindia.in/api/verify_booking_close_otp.php";
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

            this.router.navigate(["/home-care"],);
            this.ngxService.stop()
          }
          else {
            this.ngxService.start()
            this.toast = this.toastController
              .create({
                message: "OTP not validated! Either the OTP is expired or incorrect!",
                duration: 2000,
              })
              .then((toastData) => {
                console.log(toastData);
                toastData.present();
              });




            this.router.navigate(["/home-verfied-opt"],);
          }

          // this.router.navigate(["home"],);
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


}

