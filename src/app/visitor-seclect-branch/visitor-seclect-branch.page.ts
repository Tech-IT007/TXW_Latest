import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visitor-seclect-branch',
  templateUrl: './visitor-seclect-branch.page.html',
  styleUrls: ['./visitor-seclect-branch.page.scss'],
})
export class VisitorSeclectBranchPage implements OnInit {
  temp: any;
  selectedValue: any;
  company :any;
  Other:boolean
  constructor(public router :Router , private http : HttpClient) { }
   status = {
   "CorporateID" : "",
   "search_term":"-1",
   }
  ngOnInit() {
    this.all_company()
  }




  onSelectChange_company(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
    this.status.CorporateID = this.selectedValue
    var url = "https://techxpertindia.in/api/branch/search_branch.php"
    this.http.post(url,this.status).subscribe((data)=>{
      console.log(data)
    this.temp = data
    this.temp  = this.temp
    console.log(this.temp)
    })
  }  


  all_company(){
    var url = "https://techxpertindia.in/api/company/select_corporate_account.php"
    this.http.get(url).subscribe((data)=>{
      console.log(data)
    this.company = data
    this.company= this.company
    console.log(this.company)
    })
  }


  onSelectChange_branch(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)

  localStorage.setItem("Vistior_branch_id",this.selectedValue)
  }   
}
