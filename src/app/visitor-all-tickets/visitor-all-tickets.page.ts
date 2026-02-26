import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-visitor-all-tickets',
  templateUrl: './visitor-all-tickets.page.html',
  styleUrls: ['./visitor-all-tickets.page.scss'],
})
export class VisitorAllTicketsPage implements OnInit {
  SiteVisitID: any;
  users: any;
  obj: any;
  Status: any;
  hidd: boolean;

  constructor(public router:Router , private http :HttpClient) { }
temp :any 
  userdetails = {
    "CreatedBy":localStorage.getItem("workname"),
    "start_counter":0,
    "no_of_records":5
  }
  ionViewWillEnter() {
    this.all_tickets()
  }
  ngOnInit() {
 
  }

all_tickets(){

  var api = "https://techxpertindia.in/api/site_visits/get_all_site_visits.php"
return this.http.post(api , this.userdetails).subscribe((data)=>{
  this.users = data;
      this.obj = this.users
      console.log(this.obj);
   
   console.log(data)
})
}


route_to_Observation(userID) {
  this. SiteVisitID = userID;
  console.log(this.SiteVisitID)
  localStorage.setItem("SiteVisitID",this.SiteVisitID)
  this.temp = localStorage.getItem("SiteVisitID")
  console.log(this.temp)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      SiteVisitID : this. SiteVisitID
    

    }

  }
  // this.router.navigate(['ppm-assgine-status'], navigationExtras);
  this.router.navigate(['visitor-booking'], navigationExtras);
}


route_to_Summary(userID){
  this. SiteVisitID = userID;
  console.log(this.SiteVisitID)
  localStorage.setItem("SummaryID",this.SiteVisitID)
  this.temp = localStorage.getItem("SummaryID")
  console.log(this.temp)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      SiteVisitID : this. SiteVisitID
    

    }

  }
  // this.router.navigate(['ppm-assgine-status'], navigationExtras);
  this.router.navigate(['/visitor-summary'], navigationExtras);
}
loadData(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();

    this.userdetails.start_counter = this.userdetails.start_counter + 5;
    var url =  "https://techxpertindia.in/api/site_visits/get_all_site_visits.php"
  // console.log(this.user);
  return this.http.post(url,this.userdetails ,{headers:new HttpHeaders({"content-Type":"application/json"})})
  .subscribe(data => {
    console.log(data);
    this.users = data;
    this.temp = this.users.data;
    this.obj = this.obj.concat(this.temp);
    console.log(this.obj);
  
  });

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
  
  }, 500);
}



doRefresh(event) {
  console.log('Begin async operation');
 this.all_tickets()

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}
}
