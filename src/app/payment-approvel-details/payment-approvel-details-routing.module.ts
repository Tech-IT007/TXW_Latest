import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentApprovelDetailsPage } from './payment-approvel-details.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentApprovelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentApprovelDetailsPageRoutingModule {}
