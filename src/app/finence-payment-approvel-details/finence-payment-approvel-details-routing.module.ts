import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinencePaymentApprovelDetailsPage } from './finence-payment-approvel-details.page';

const routes: Routes = [
  {
    path: '',
    component: FinencePaymentApprovelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinencePaymentApprovelDetailsPageRoutingModule {}
