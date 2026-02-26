import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import {  NgxUiLoaderService } from "ngx-ui-loader";
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-clint-tickets-edit',
  templateUrl: './clint-tickets-edit.component.html',
  styleUrls: ['./clint-tickets-edit.component.scss'],
})
export class ClintTicketsEditComponent implements OnInit {
  DataTosend : any = {
    TicketID: localStorage.getItem("Tickets_view"),
    ClientTicketID :""
  }
  temp :any;
  toast: any;
  testvar: any
  message: any;
  userId: any;
  constructor(
    public toastController: ToastController,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    public router: Router,
    public loadingCtrl: LoadingController 
  ) { }

  ngOnInit() {}




  submit() {
  
    this.ngxService.start();

    this.ngxService.start();
    if (this.DataTosend.ClientTicketID == "" ) {
         
      this.toast = this.toastController

        .create({
          message: "Enter Your Message",
          duration: 2000,
        })
        .then((toastData) => {
          console.log(toastData);
          toastData.present();
        });
        this.ngxService.stop();
    }


    else {

     
   
     
      var url =
        "https://techxpertindia.in/api/add_client_id.php";
      // console.log(this.userdetails);
      // console.log("Ticket with number CS-AMC-000003 has been raised succesfully!");

      return this.http
        .post(url, this.DataTosend, {
          headers: new HttpHeaders({ "content-Type": "application/json" }),
        })
        .subscribe((reponse) => {
          console.log(reponse);
          this.testvar = reponse;

          this.message = reponse 
          this.message = this.message.message
          console.log(this.message)
        


          if (this.testvar.error !== false || this.testvar == "") {
            alert(
              "Form not submitted due to some technical error pls try again!"
            );
          }
          let navigationExtras: NavigationExtras = {
            queryParams: {
              userId: this.userId,
            },
          };
    
          this.toast = this.toastController
          .create({
            message: this.message,
            duration: 2000,
          })
          .then((toastData) => {
            console.log(toastData);
            toastData.present();
              location.reload()
            this.ngxService.stop();
          });
        });

    }
  }

}
