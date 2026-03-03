import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CFOPaymentApprovelPage } from './cfo-payment-approvel.page';

const routes: Routes = [
  {
    path: '',
    component: CFOPaymentApprovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CFOPaymentApprovelPageRoutingModule {}
