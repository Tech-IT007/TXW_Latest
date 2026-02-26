import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchAccountPaymentDetailsPage } from './branch-account-payment-details.page';

const routes: Routes = [
  {
    path: '',
    component: BranchAccountPaymentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchAccountPaymentDetailsPageRoutingModule {}
