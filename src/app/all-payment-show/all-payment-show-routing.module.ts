import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPaymentShowPage } from './all-payment-show.page';

const routes: Routes = [
  {
    path: '',
    component: AllPaymentShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPaymentShowPageRoutingModule {}
