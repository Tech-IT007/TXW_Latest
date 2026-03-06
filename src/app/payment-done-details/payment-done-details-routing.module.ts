import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDoneDetailsPage } from './payment-done-details.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentDoneDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDoneDetailsPageRoutingModule {}
