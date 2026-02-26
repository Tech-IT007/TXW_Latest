import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentApprovelPage } from './payment-approvel.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentApprovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentApprovelPageRoutingModule {}
