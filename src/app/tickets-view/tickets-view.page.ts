import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController, LoadingController } from "@ionic/angular";

import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.page.html',
  styleUrls: ['./tickets-view.page.scss'],
})
export class TicketsViewPage implements OnInit {
  toast: any;

  message: any;




  userId: any;
  Test: any;
  view: any = {};

  Users: any;
  impact_data: any;

  test_variable: any;

  dataToSend = {
    TicketID: ""
  }


  impact: any = {};

  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.detailsview();

  }

  ngOnInit() { }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
      }
      if (params.profile) {
        this.profilepage = 1;
      }
      else {
        this.profilepage = 0;
      }
      console.log(this.dataToSend);
      this.Getdata();



    })
  }
  Getdata() {
    var url = "https://techxpertindia.in/api/get_corporate_ticket_detail.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact);
      });
  }




}











































































