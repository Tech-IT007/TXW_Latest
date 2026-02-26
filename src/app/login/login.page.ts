import { Component, OnInit } from "@angular/core";
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  showPassword = false;

  userdetails = {
    username: "",
    password: "",
    device_id: ""
  };

  EmployeeID: any;
  CorporateID: any;
  BranchID: any;
  role: any;
  message: any;

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    public loadingCtrl: LoadingController,

  ) {}

  ngOnInit() {
      // console.log("DEVICE ID:", this.device.uuid);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  submit() {

    if (!this.userdetails.username || !this.userdetails.password) {
      this.presentToast("Please enter your credentials");
      return;
    }

    // 🔐 DEVICE UUID


    this.ngxService.start();

    const url = "https://techxpertindia.in/api/login.php";

    this.http.post(url, this.userdetails, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe({

      next: (response: any) => {
        this.ngxService.stop();

        console.log("LOGIN RESPONSE:", response);

        if (response.error === true) {
          this.presentToast(response.message);
          return;
        }

        // 🚫 ROLE CHECK
        if (
          response.data.UserType === "Corporate Branch User" ||
          response.data.UserType === "Corporate Admin"
        ) {
          this.presentToast("User does not have access to Work App");
          return;
        }

        // ✅ SAVE DATA
        localStorage.setItem("EmployeeID", response.data.EmployeeID);
        localStorage.setItem("workname", response.data.UserName);
        localStorage.setItem("CorporateID", response.data.CorporateID);
        localStorage.setItem("BranchID", response.data.BranchID);
        localStorage.setItem("role", response.data.role.EmployeeRoles);
        localStorage.setItem("StateName", response.data.State);
        this.presentToast(response.message);

        // ✅ GO TO DASHBOARD
      window.location.reload()
        this.router.navigateByUrl('/vendor-new-page', { replaceUrl: true });

      },

      error: () => {
        this.ngxService.stop();
        this.presentToast("Server error. Try again.");
      }

    });
  }
}
