import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPaymentDetailsPage } from './all-payment-details.page';

const routes: Routes = [
  {
    path: '',
    component: AllPaymentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPaymentDetailsPageRoutingModule {}
