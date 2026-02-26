import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NavigationExtras, PreloadAllModules, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  userid: any;
  isMuted: boolean = false;
  Test = {
    "AwarenessId": ""
  }
  user: any = {
    "EmployeeID": localStorage.getItem("EmployeeID")
  }
  name: any = {
    "name": ""
  };
  infiniteScroll: any;

  constructor(private http: HttpClient, private router: Router
    ,private ngxService: NgxUiLoaderService, private storage: Storage) {
    this.name = localStorage.getItem("name");
    this.user.username = localStorage.getItem("name");
    // console.log(this.user.role);
    this.runHttp();
  }

  async ngOnInit() {
    await this.storage.create();
    const muteStatus = await this.storage.get('isMuted');
    this.isMuted = muteStatus || false;
  }

  ionViewWillEnter() {
    // this.runHttp();
  }

  users: any = [];
  temp: any = [];
  obj: any = [];
  page = 0;
  searchTerm: string;

  runHttp() {


    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/get_employee_info.php";
    // console.log(this.user);
    return this.http.post(url, this.user, { headers: new HttpHeaders({ "content-Type": "application/json" }) })
      .subscribe(data => {
        // console.log(data);
        this.users = data;
        this.obj = this.users.data;
        // console.log(this.obj);
      });
    }, 100);
  }


  submit(){
    this.router.navigateByUrl('edit-profile')
  }

  async toggleMute() {
    await this.storage.set('isMuted', this.isMuted);
  }
}