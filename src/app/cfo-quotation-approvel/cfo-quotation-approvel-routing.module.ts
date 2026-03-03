import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CfoQuotationApprovelPage } from './cfo-quotation-approvel.page';

const routes: Routes = [
  {
    path: '',
    component: CfoQuotationApprovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CfoQuotationApprovelPageRoutingModule {}
