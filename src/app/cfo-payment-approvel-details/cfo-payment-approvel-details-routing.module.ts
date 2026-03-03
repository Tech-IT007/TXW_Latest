import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CFOPaymentApprovelDetailsPage } from './cfo-payment-approvel-details.page';

const routes: Routes = [
  {
    path: '',
    component: CFOPaymentApprovelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CFOPaymentApprovelDetailsPageRoutingModule {}
