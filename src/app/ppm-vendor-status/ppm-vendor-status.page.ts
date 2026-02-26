import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-ppm-vendor-status',
  templateUrl: './ppm-vendor-status.page.html',
  styleUrls: ['./ppm-vendor-status.page.scss'],
})
export class PpmVendorStatusPage implements OnInit {
  impact: any = {}

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,

    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
  ) { 
   this. Getdata()
  }

  status:any;
  dataToSend = {
    "EmployeeID": localStorage.getItem("EmployeeID"),
     "Status"   :  ""

  }
  ngOnInit() {
  }
  Getdata() {
    

    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();
    var url = "https://techxpertindia.in/api/get_vendor_tickets_status_dashboard.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
      
        this.impact = response;
        this.impact = this.impact.data
        console.log(this.impact)
       
      })
    }, 100);
}

  
logValue(element) {
  console.log(element.textContent);

  this.status = element.textContent
  // console.log(this.Service)

}

sum(){
  
  this.status = document.getElementById('pending').innerHTML

  console.log(this.status)
  
  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
 this.router.navigateByUrl('desboard-view-homecare')
  
}
complet(){
  this.status = document.getElementById('complet').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')
}


 Progress(){
  this.status = document.getElementById('Progress').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')
 }


 Escalated(){
  this.status = document.getElementById('Escalated').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')
 }

 QSAP(){
  this.status = document.getElementById('QSAP').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')
 }

 HBC(){
  this.status = document.getElementById('HBC').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')

 }

 HBT(){
  this.status = document.getElementById('HBT').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')

 }

 VDQP(){
  this.status = document.getElementById('VDQP').innerHTML

  console.log(this.status)

  this.status  = localStorage.setItem("status",this.status)
  this.status = localStorage.getItem("status")
  console.log(this.status)
  this.router.navigateByUrl('desboard-view-homecare')

 }

   
}

