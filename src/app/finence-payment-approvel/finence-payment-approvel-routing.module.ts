import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinencePaymentApprovelPage } from './finence-payment-approvel.page';

const routes: Routes = [
  {
    path: '',
    component: FinencePaymentApprovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinencePaymentApprovelPageRoutingModule {}
