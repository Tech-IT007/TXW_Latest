import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'past',
    loadChildren: () => import('./past/past.module').then( m => m.PastPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'status',
    loadChildren: () => import('./status/status.module').then( m => m.StatusPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rocket',
    loadChildren: () => import('./rocket/rocket.module').then( m => m.RocketPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'corprate-tickets',
    loadChildren: () => import('./corprate-tickets/corprate-tickets.module').then( m => m.CorprateTicketsPageModule)
  },
  {
    path: 'cop-current-tickets',
    loadChildren: () => import('./cop-current-tickets/cop-current-tickets.module').then( m => m.CopCurrentTicketsPageModule)
  },
  {
    path: 'tickets-view',
    loadChildren: () => import('./tickets-view/tickets-view.module').then( m => m.TicketsViewPageModule)
  },
  {
    path: 'corprate-past-tickets',
    loadChildren: () => import('./corprate-past-tickets/corprate-past-tickets.module').then( m => m.CorpratePastTicketsPageModule)
  },
  {
    path: 'city-tickets',
    loadChildren: () => import('./city-tickets/city-tickets.module').then( m => m.CityTicketsPageModule)
  },
  {
    path: 'corprate-city-lead',
    loadChildren: () => import('./corprate-city-lead/corprate-city-lead.module').then( m => m.CorprateCityLeadPageModule)
  },
  {
    path: 'home-city-lead',
    loadChildren: () => import('./home-city-lead/home-city-lead.module').then( m => m.HomeCityLeadPageModule)
  },
  {
    path: 'assig-page',
    loadChildren: () => import('./assig-page/assig-page.module').then( m => m.AssigPagePageModule)
  },
  {
    path: 'corpate-status',
    loadChildren: () => import('./corpate-status/corpate-status.module').then( m => m.CorpateStatusPageModule)
  },
  {
    path: 'home-complet-tickets',
    loadChildren: () => import('./home-complet-tickets/home-complet-tickets.module').then( m => m.HomeCompletTicketsPageModule)
  },
  {
    path: 'vendor-new-page',
    loadChildren: () => import('./vendor-new-page/vendor-new-page.module').then( m => m.VendorNewPagePageModule)
  },
  {
    path: 'attdenc-in',
    loadChildren: () => import('./attdenc-in/attdenc-in.module').then( m => m.AttdencINPageModule)
  },
  {
    path: 'attdenc-out',
    loadChildren: () => import('./attdenc-out/attdenc-out.module').then( m => m.AttdencOUTPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then( m => m.TestingPageModule)
  },
  {
    path: 'ppm-tickets',
    loadChildren: () => import('./ppm-tickets/ppm-tickets.module').then( m => m.PpmTicketsPageModule)
  },
  {
    path: 'ppm-assgine-status',
    loadChildren: () => import('./ppm-assgine-status/ppm-assgine-status.module').then( m => m.PpmAssgineStatusPageModule)
  },
  {
    path: 'ppm-vendor-status',
    loadChildren: () => import('./ppm-vendor-status/ppm-vendor-status.module').then( m => m.PpmVendorStatusPageModule)
  },
  {
    path: 'ppm-past-tickets',
    loadChildren: () => import('./ppm-past-tickets/ppm-past-tickets.module').then( m => m.PpmPastTicketsPageModule)
  },
  {
    path: 'attdence-profile',
    loadChildren: () => import('./attdence-profile/attdence-profile.module').then( m => m.AttdenceProfilePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'desboard-view-homecare',
    loadChildren: () => import('./desboard-view-homecare/desboard-view-homecare.module').then( m => m.DesboardViewHomecarePageModule)
  },
  {
    path: 'desboard-view-corporate',
    loadChildren: () => import('./desboard-view-corporate/desboard-view-corporate.module').then( m => m.DesboardViewCorporatePageModule)
  },
  {
    path: 'deshbord-view-details',
    loadChildren: () => import('./deshbord-view-details/deshbord-view-details.module').then( m => m.DeshbordViewDetailsPageModule)
  },
  {
    path: 'deshbord-view-details-coporate',
    loadChildren: () => import('./deshbord-view-details-coporate/deshbord-view-details-coporate.module').then( m => m.DeshbordViewDetailsCoporatePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'verfication-otp',
    loadChildren: () => import('./verfication-otp/verfication-otp.module').then( m => m.VerficationOtpPageModule)
  },
  {
    path: 'submit',
    loadChildren: () => import('./submit/submit.module').then( m => m.SubmitPageModule)
  },
  {
    path: 'opt-submit',
    loadChildren: () => import('./opt-submit/opt-submit.module').then( m => m.OptSubmitPageModule)
  },
  {
    path: 'charge',
    loadChildren: () => import('./charge/charge.module').then( m => m.ChargePageModule)
  },
  {
    path: 'all-convence-charge',
    loadChildren: () => import('./all-convence-charge/all-convence-charge.module').then( m => m.AllConvenceChargePageModule)
  },
  {
    path: 'city-view',
    loadChildren: () => import('./city-view/city-view.module').then( m => m.CityViewPageModule)
  },
  {
    path: 'city-submit-closer',
    loadChildren: () => import('./city-submit-closer/city-submit-closer.module').then( m => m.CitySubmitCloserPageModule)
  },
  {
    path: 'city-close-tickets',
    loadChildren: () => import('./city-close-tickets/city-close-tickets.module').then( m => m.CityCloseTicketsPageModule)
  },
  {
    path: 'account-tickets',
    loadChildren: () => import('./account-tickets/account-tickets.module').then( m => m.AccountTicketsPageModule)
  },
  {
    path: 'account-page',
    loadChildren: () => import('./account-page/account-page.module').then( m => m.AccountPagePageModule)
  },
  {
    path: 'account-view-page',
    loadChildren: () => import('./account-view-page/account-view-page.module').then( m => m.AccountViewPagePageModule)
  },
  {
    path: 'account-view-details',
    loadChildren: () => import('./account-view-details/account-view-details.module').then( m => m.AccountViewDetailsPageModule)
  },
  {
    path: 'finance-cost',
    loadChildren: () => import('./finance-cost/finance-cost.module').then( m => m.FinanceCostPageModule)
  },
  {
    path: 'leave-managment',
    loadChildren: () => import('./leave-managment/leave-managment.module').then( m => m.LeaveManagmentPageModule)
  },
  {
    path: 'leave-chart',
    loadChildren: () => import('./leave-chart/leave-chart.module').then( m => m.LeaveChartPageModule)
  },
  {
    path: 'desk',
    loadChildren: () => import('./desk/desk.module').then( m => m.DeskPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'verified-home-care',
    loadChildren: () => import('./verified-home-care/verified-home-care.module').then( m => m.VerifiedHomeCarePageModule)
  },
  {
    path: 'home-verfied-opt',
    loadChildren: () => import('./home-verfied-opt/home-verfied-opt.module').then( m => m.HomeVerfiedOptPageModule)
  },
  {
    path: 'corporate-all-tickets',
    loadChildren: () => import('./corporate-all-tickets/corporate-all-tickets.module').then( m => m.CorporateAllTicketsPageModule)
  },
  {
    path: 'services-report',
    loadChildren: () => import('./services-report/services-report.module').then( m => m.ServicesReportPageModule)
  },
  {
    path: 'services-details',
    loadChildren: () => import('./services-details/services-details.module').then( m => m.ServicesDetailsPageModule)
  },
  {
    path: 'technician',
    loadChildren: () => import('./technician/technician.module').then( m => m.TechnicianPageModule)
  },
  {
    path: 'account-branch-tickets',
    loadChildren: () => import('./account-branch-tickets/account-branch-tickets.module').then( m => m.AccountBranchTicketsPageModule)
  },
  {
    path: 'account-view',
    loadChildren: () => import('./account-view/account-view.module').then( m => m.AccountViewPageModule)
  },
  {
    path: 'account-view-details-by-id',
    loadChildren: () => import('./account-view-details-by-id/account-view-details-by-id.module').then( m => m.AccountViewDetailsByIdPageModule)
  },
  {
    path: 'complet-branch-tickets',
    loadChildren: () => import('./complet-branch-tickets/complet-branch-tickets.module').then( m => m.CompletBranchTicketsPageModule)
  },
  {
    path: 'coprate-account-details',
    loadChildren: () => import('./coprate-account-details/coprate-account-details.module').then( m => m.CoprateAccountDetailsPageModule)
  },
  {
    path: 'coprate-account-details-by-id',
    loadChildren: () => import('./coprate-account-details-by-id/coprate-account-details-by-id.module').then( m => m.CoprateAccountDetailsByIdPageModule)
  },
  {
    path: 'hvac-form',
    loadChildren: () => import('./hvac-form/hvac-form.module').then( m => m.HVACFormPageModule)
  },
  {
    path: 'ppm-view-details',
    loadChildren: () => import('./ppm-view-details/ppm-view-details.module').then( m => m.PpmViewDetailsPageModule)
  },
  {
    path: 'all-ppm-tickest',
    loadChildren: () => import('./all-ppm-tickest/all-ppm-tickest.module').then( m => m.AllPpmTickestPageModule)
  },
  {
    path: 'ppm-submit-tickets',
    loadChildren: () => import('./ppm-submit-tickets/ppm-submit-tickets.module').then( m => m.PpmSubmitTicketsPageModule)
  },
  {
    path: 'ppm-services-report',
    loadChildren: () => import('./ppm-services-report/ppm-services-report.module').then( m => m.PpmServicesReportPageModule)
  },
  {
    path: 'visitor-all-tickets',
    loadChildren: () => import('./visitor-all-tickets/visitor-all-tickets.module').then( m => m.VisitorAllTicketsPageModule)
  },
  {
    path: 'visitor-seclect-branch',
    loadChildren: () => import('./visitor-seclect-branch/visitor-seclect-branch.module').then( m => m.VisitorSeclectBranchPageModule)
  },
  {
    path: 'visitor-booking',
    loadChildren: () => import('./visitor-booking/visitor-booking.module').then( m => m.VisitorBookingPageModule)
  },
  {
    path: 'visitor-summary',
    loadChildren: () => import('./visitor-summary/visitor-summary.module').then( m => m.VisitorSummaryPageModule)
  },
  {
    path: 'visitor-clint-details',
    loadChildren: () => import('./visitor-clint-details/visitor-clint-details.module').then( m => m.VisitorClintDetailsPageModule)
  },
  {
    path: 'ppm-account-branch',
    loadChildren: () => import('./ppm-account-branch/ppm-account-branch.module').then( m => m.PpmAccountBranchPageModule)
  },
  {
    path: 'ppm-account-view-details',
    loadChildren: () => import('./ppm-account-view-details/ppm-account-view-details.module').then( m => m.PpmAccountViewDetailsPageModule)
  },
  {
    path: 'ppm-account-booking',
    loadChildren: () => import('./ppm-account-booking/ppm-account-booking.module').then( m => m.PpmAccountBookingPageModule)
  },
  {
    path: 'ppm-hvac-form',
    loadChildren: () => import('./ppm-hvac-form/ppm-hvac-form.module').then( m => m.PpmHvacFormPageModule)
  },
  {
    path: 'tseting23',
    loadChildren: () => import('./tseting23/tseting23.module').then( m => m.Tseting23PageModule)
  },
  {
    path: 'ups',
    loadChildren: () => import('./ups/ups.module').then( m => m.UPSPageModule)
  },
  {
    path: 'cctv',
    loadChildren: () => import('./cctv/cctv.module').then( m => m.CCTVPageModule)
  },
  {
    path: 'fire',
    loadChildren: () => import('./fire/fire.module').then( m => m.FirePageModule)
  },
  {
    path: 'fire-check-list',
    loadChildren: () => import('./fire-check-list/fire-check-list.module').then( m => m.FireCheckListPageModule)
  },
  {
    path: 'attdence-history',
    loadChildren: () => import('./attdence-history/attdence-history.module').then( m => m.AttdenceHistoryPageModule)
  },
  {
    path: 'approvel-testing',
    loadChildren: () => import('./approvel-testing/approvel-testing.module').then( m => m.ApprovelTestingPageModule)
  },

  {
    path: 'panel-checklist',
    loadChildren: () => import('./panel-checklist/panel-checklist.module').then( m => m.PanelChecklistPageModule)
  },
  {
    path: 'new-havc',
    loadChildren: () => import('./new-havc/new-havc.module').then( m => m.NewHavcPageModule)
  },
  {
    path: 'panels',
    loadChildren: () => import('./panels/panels.module').then( m => m.PanelsPageModule)
  },
  {
    path: 'barcode-info',
    loadChildren: () => import('./barcode-info/barcode-info.module').then( m => m.BarcodeInfoPageModule)
  },
  {
    path: 'barcode-scanning',
    loadChildren: () => import('./barcode-scanning/barcode-scanning.module').then( m => m.BarcodeScanningPageModule)
  },
  {
    path: 'mismatch-modal',
    loadChildren: () => import('./mismatch-modal/mismatch-modal.module').then( m => m.MismatchModalPageModule)
  },
  {
    path: 'entry-checklist',
    loadChildren: () => import('./entry-checklist/entry-checklist.module').then( m => m.EntryChecklistPageModule)
  },
  {
    path: 'all-history',
    loadChildren: () => import('./all-history/all-history.module').then( m => m.AllHistoryPageModule)
  },
  {
    path: 'feedback-page',
    loadChildren: () => import('./feedback-page/feedback-page.module').then( m => m.FeedbackPagePageModule)
  },
  {
    path: 'ppm-show-history',
    loadChildren: () => import('./ppm-show-history/ppm-show-history.module').then( m => m.PpmShowHistoryPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'dpr',
    loadChildren: () => import('./dpr/dpr.module').then( m => m.DPRPageModule)
  },
  {
    path: 'dashboard-modal',
    loadChildren: () => import('./dashboard-modal/dashboard-modal.module').then( m => m.DashboardModalPageModule)
  },
  {
    path: 'kpi',
    loadChildren: () => import('./kpi/kpi.module').then( m => m.KPIPageModule)
  },
  {
    path: 'mywork-zone',
    loadChildren: () => import('./mywork-zone/mywork-zone.module').then( m => m.MyworkZonePageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'dpr-id-list',
    loadChildren: () => import('./dpr-id-list/dpr-id-list.module').then( m => m.DprIdListPageModule)
  },
  {
    path: 'dpr-form',
    loadChildren: () => import('./dpr-form/dpr-form.module').then( m => m.DprFormPageModule)
  },
  {
    path: 'dp-list2',
    loadChildren: () => import('./dp-list2/dp-list2.module').then( m => m.DpList2PageModule)
  },
  {
    path: 'view-camera-details',
    loadChildren: () => import('./view-camera-details/view-camera-details.module').then( m => m.ViewCameraDetailsPageModule)
  },
  {
    path: 'submit-spare-part',
    loadChildren: () => import('./submit-spare-part/submit-spare-part.module').then( m => m.SubmitSparePartPageModule)
  },
  {
    path: 'create-quation',
    loadChildren: () => import('./create-quation/create-quation.module').then( m => m.CreateQuationPageModule)
  },
  {
    path: 'view-history-quotation',
    loadChildren: () => import('./view-history-quotation/view-history-quotation.module').then( m => m.ViewHistoryQuotationPageModule)
  },
  {
    path: 'tickets-convence-charge',
    loadChildren: () => import('./tickets-convence-charge/tickets-convence-charge.module').then( m => m.TicketsConvenceChargePageModule)
  },
  {
    path: 'app-update-modal',
    loadChildren: () => import('./app-update-modal/app-update-modal.module').then( m => m.AppUpdateModalPageModule)
  },
  {
    path: 'paymet-form',
    loadChildren: () => import('./paymet-form/paymet-form.module').then( m => m.PaymetFormPageModule)
  },
  {
    path: 'paymet-show',
    loadChildren: () => import('./paymet-show/paymet-show.module').then( m => m.PaymetShowPageModule)
  },
  {
    path: 'all-payment-show',
    loadChildren: () => import('./all-payment-show/all-payment-show.module').then( m => m.AllPaymentShowPageModule)
  },
  {
    path: 'all-payment-details',
    loadChildren: () => import('./all-payment-details/all-payment-details.module').then( m => m.AllPaymentDetailsPageModule)
  },
  {
    path: 'branch-coporate-ticket-details',
    loadChildren: () => import('./branch-coporate-ticket-details/branch-coporate-ticket-details.module').then( m => m.BranchCoporateTicketDetailsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'verfied-reset-password',
    loadChildren: () => import('./verfied-reset-password/verfied-reset-password.module').then( m => m.VerfiedResetPasswordPageModule)
  },
  {
    path: 'home-care',
    loadChildren: () => import('./home-care/home-care.module').then( m => m.HomeCarePageModule)
  },
  {
    path: 'home-care-details',
    loadChildren: () => import('./home-care-details/home-care-details.module').then( m => m.HomeCareDetailsPageModule)
  },
  {
    path: 'raised-ticket',
    loadChildren: () => import('./raised-ticket/raised-ticket.module').then( m => m.RaisedTicketPageModule)
  },
  {
    path: 'account-payment',
    loadChildren: () => import('./account-payment/account-payment.module').then( m => m.AccountPaymentPageModule)
  },
  {
    path: 'branch-account-payment-form',
    loadChildren: () => import('./branch-account-payment-form/branch-account-payment-form.module').then( m => m.BranchAccountPaymentFormPageModule)
  },
  {
    path: 'branch-account-payment-details',
    loadChildren: () => import('./branch-account-payment-details/branch-account-payment-details.module').then( m => m.BranchAccountPaymentDetailsPageModule)
  },
  {
    path: 'technican-all-tickets',
    loadChildren: () => import('./technican-all-tickets/technican-all-tickets.module').then( m => m.TechnicanAllTicketsPageModule)
  },
  {
    path: 'account-site-vist',
    loadChildren: () => import('./account-site-vist/account-site-vist.module').then( m => m.AccountSiteVistPageModule)
  },
  {
    path: 'account-site-vist-all-data',
    loadChildren: () => import('./account-site-vist-all-data/account-site-vist-all-data.module').then( m => m.AccountSiteVistAllDataPageModule)
  },
  {
    path: 'account-convence-charge',
    loadChildren: () => import('./account-convence-charge/account-convence-charge.module').then( m => m.AccountConvenceChargePageModule)
  },
  {
    path: 'account-vist-form',
    loadChildren: () => import('./account-vist-form/account-vist-form.module').then( m => m.AccountVistFormPageModule)
  },
  {
    path: 'technician-vist-form',
    loadChildren: () => import('./technician-vist-form/technician-vist-form.module').then( m => m.TechnicianVistFormPageModule)
  },
  {
    path: 'techician-all-site-vist-data',
    loadChildren: () => import('./techician-all-site-vist-data/techician-all-site-vist-data.module').then( m => m.TechicianAllSiteVistDataPageModule)
  },
  {
    path: 'techician-all-site-vist-details',
    loadChildren: () => import('./techician-all-site-vist-details/techician-all-site-vist-details.module').then( m => m.TechicianAllSiteVistDetailsPageModule)
  },
  {
    path: 'technicean-create-vist',
    loadChildren: () => import('./technicean-create-vist/technicean-create-vist.module').then( m => m.TechniceanCreateVistPageModule)
  },
  {
    path: 'technicean-complete-visit',
    loadChildren: () => import('./technicean-complete-visit/technicean-complete-visit.module').then( m => m.TechniceanCompleteVisitPageModule)
  },
  {
    path: 'audit-data',
    loadChildren: () => import('./audit-data/audit-data.module').then( m => m.AuditDataPageModule)
  },
  {
    path: 'quotation-approve-all-tickets',
    loadChildren: () => import('./quotation-approve-all-tickets/quotation-approve-all-tickets.module').then( m => m.QuotationApproveAllTicketsPageModule)
  },
  {
    path: 'account-approvel-details-by-id',
    loadChildren: () => import('./account-approvel-details-by-id/account-approvel-details-by-id.module').then( m => m.AccountApprovelDetailsByIdPageModule)
  },
  {
    path: 'account-approvel-status',
    loadChildren: () => import('./account-approvel-status/account-approvel-status.module').then( m => m.AccountApprovelStatusPageModule)
  },
  {
    path: 'payment-approvel',
    loadChildren: () => import('./payment-approvel/payment-approvel.module').then( m => m.PaymentApprovelPageModule)
  },
  {
    path: 'payment-approvel-details',
    loadChildren: () => import('./payment-approvel-details/payment-approvel-details.module').then( m => m.PaymentApprovelDetailsPageModule)
  },
  {
    path: 'finence-payment-approvel',
    loadChildren: () => import('./finence-payment-approvel/finence-payment-approvel.module').then( m => m.FinencePaymentApprovelPageModule)
  },
  {
    path: 'finence-payment-approvel-details',
    loadChildren: () => import('./finence-payment-approvel-details/finence-payment-approvel-details.module').then( m => m.FinencePaymentApprovelDetailsPageModule)
  },
  {
    path: 'cfo-payment-approvel',
    loadChildren: () => import('./cfo-payment-approvel/cfo-payment-approvel.module').then( m => m.CFOPaymentApprovelPageModule)
  },
  {
    path: 'cfo-payment-approvel-details',
    loadChildren: () => import('./cfo-payment-approvel-details/cfo-payment-approvel-details.module').then( m => m.CFOPaymentApprovelDetailsPageModule)
  },
  {
    path: 'cfo-quotation-approvel',
    loadChildren: () => import('./cfo-quotation-approvel/cfo-quotation-approvel.module').then( m => m.CfoQuotationApprovelPageModule)
  },
  {
    path: 'cfo-quotation-approvel-details',
    loadChildren: () => import('./cfo-quotation-approvel-details/cfo-quotation-approvel-details.module').then( m => m.CfoQuotationApprovelDetailsPageModule)
  },
  {
    path: 'payment-done-details',
    loadChildren: () => import('./payment-done-details/payment-done-details.module').then( m => m.PaymentDoneDetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
