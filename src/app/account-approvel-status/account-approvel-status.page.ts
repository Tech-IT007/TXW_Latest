import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-account-approvel-status',
  templateUrl: './account-approvel-status.page.html',
  styleUrls: ['./account-approvel-status.page.scss'],
})
export class AccountApprovelStatusPage implements OnInit {

  approvalUrl: SafeResourceUrl | null = null;

  dataToSend = {
    TicketID: localStorage.getItem('Ticket_id'),
  };

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.Getdata();
  }

  Getdata() {

    console.log("API calling...");
    this.ngxService.start();

    const api = 'https://techxpertindia.in/api/get_corporate_ticket_detail.php';

    this.http.post(api, this.dataToSend, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
    .subscribe({
      next: (response: any) => {

        console.log("FULL API RESPONSE:", response);

        // ✅ IMPORTANT FIX — data is OBJECT not ARRAY
        const data = response.data;

        console.log("Extracted Data Object:", data);

        if (!data) {
          console.error("No data received");
          this.ngxService.stop();
          return;
        }

        // ✅ CORRECT EXTRACTION
        const quotationID = data.TicketQuotationID;
        const employeeID = localStorage.getItem("EmployeeID");
        const branchState = data.BranchState;
        const stateApproval = localStorage.getItem("IsStateApprove");
        const financeApproval = localStorage.getItem("IsFinanceApprove");

        console.log("Extracted Values:", {
          quotationID,
          employeeID,
          branchState,
          stateApproval,
          financeApproval
        });

        // ✅ BUILD URL
        const finalUrl =
          `https://techxpertindia.in/admin/corporate-tickets/view-web-quotation-approval.php?` +
          `QuotationID=${quotationID}&EmployeeID=${employeeID}&BranchState=${branchState}` +
          `&IsStateApproval=${stateApproval}&IsFinanceApproval=${financeApproval}`;

        console.log("FINAL URL:", finalUrl);

        // ✅ SANITIZE
        this.approvalUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);

        this.ngxService.stop();
      },

      error: (err) => {
        console.error("API ERROR:", err);
        this.ngxService.stop();
      }
    });
  }
}