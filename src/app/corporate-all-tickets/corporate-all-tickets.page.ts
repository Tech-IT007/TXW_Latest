import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corporate-all-tickets',
  templateUrl: './corporate-all-tickets.page.html',
  styleUrls: ['./corporate-all-tickets.page.scss'],
})
export class CorporateAllTicketsPage implements OnInit {
CFO_Roles: any;

  constructor( public router:Router  , private http : HttpClient) {
    this.verfiction()
   }
userdetails = {
   "EmployeeID": localStorage.getItem("EmployeeID")
}
  ngOnInit() {
    this.roles()
  
    this.CFO_Roles = localStorage.getItem("role");
  }


  display_city_tickets = 0
  display_AM_tickets = 0
  display_BAM_tickets  = 0
  roles() {
    const role = localStorage.getItem("role");
    
    if (role) {
      console.log(role); // Log the role for debugging
      
      // Split roles into an array
      let rolesArray = role.split(',');
      console.log(rolesArray);
      if ( rolesArray.includes("Branch Account Manager")){
        this.display_BAM_tickets = 1
      }   
      if ( rolesArray.includes("City Corporate Lead")){
        this.display_city_tickets = 1
      } 
      if ( rolesArray.includes("Account Manager")){
        this.display_AM_tickets = 1
      } 
    }
  }


routing_page_City  (){
  const role = localStorage.getItem("role");

  if (role) {
  console.log(role); // Log the role for debugging
      
  // Split roles into an array
  let rolesArray = role.split(',');
  console.log(rolesArray);

  if ( rolesArray.includes("City Corporate Lead")){
     this.router.navigateByUrl("/city-tickets")
  } 
else{
  alert("Opps you are not city corporate lead ")
}
  } 
}


routing_page_Branch_Manager (){
  const role = localStorage.getItem("role");

  if (role) {
  console.log(role); // Log the role for debugging
      
  // Split roles into an array
  let rolesArray = role.split(',');
  console.log(rolesArray);

  if ( rolesArray.includes("Branch Account Manager")){
     this.router.navigateByUrl("/account-branch-tickets")
  } 
else{
  alert("Opps you are not branch account manager ")
}
  } 
}

routing_page_account_tickets  (){
  const role = localStorage.getItem("role");

  if (role) {
  console.log(role); // Log the role for debugging
      
  // Split roles into an array
  let rolesArray = role.split(',');
  console.log(rolesArray);

  if ( rolesArray.includes("Account Manager")){
     this.router.navigateByUrl("/account-tickets")
  } 
else{
  alert("Opps you are not account manager ")
}
  } 
}


display: boolean = false;

verfiction() {
    const role = localStorage.getItem("role");
  let rolesArray: string[] = [];

  if (role) {
    console.log(role);
    rolesArray = role.split(',');
    console.log(rolesArray);
  }
  const api = "https://techxpertindia.in/api/check_state_approval_access.php";

  this.http.post<any>(api, this.userdetails).subscribe((response) => {
    console.log(response);

    const finance = response.IsFinanceApprove;
    localStorage.setItem("IsFinanceApprove", finance);
    const state = response.IsStateApprove;
    localStorage.setItem("IsStateApprove", state);
    const stateName = response.ApprovedStates;
    localStorage.setItem("StateName", stateName);

    // CONDITION
    if (finance === "No" && state === "No" && !rolesArray.includes("CFO")) {
      this.display = false;
    } else {
      this.display = true;
    }

    console.log("Display:", this.display);
  });
}

login_approvel() {

  const role = localStorage.getItem("role");
  let rolesArray: string[] = [];

  if (role) {
    console.log(role);
    rolesArray = role.split(',');
    console.log(rolesArray);
  }

  if (localStorage.getItem("IsFinanceApprove") === "Yes") {

    this.router.navigateByUrl("/finence-payment-approvel");

  } else if (localStorage.getItem("IsStateApprove") === "Yes") {

    this.router.navigateByUrl("/payment-approvel");

  } else if (rolesArray.includes("CFO")) {

    this.router.navigateByUrl("/cfo-payment-approvel");

  }

}
login_approvel_quotaion() {

  const role = localStorage.getItem("role");
  let rolesArray: string[] = [];

  if (role) {
    console.log(role);
    rolesArray = role.split(',');
    console.log(rolesArray);
  }

  if (rolesArray.includes("CFO")) {

    this.router.navigateByUrl("/cfo-quotation-approvel");

  } else {

    this.router.navigateByUrl("/quotation-approve-all-tickets");

  }
}



}
