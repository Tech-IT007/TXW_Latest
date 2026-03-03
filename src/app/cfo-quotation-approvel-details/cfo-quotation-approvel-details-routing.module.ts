import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CfoQuotationApprovelDetailsPage } from './cfo-quotation-approvel-details.page';

const routes: Routes = [
  {
    path: '',
    component: CfoQuotationApprovelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CfoQuotationApprovelDetailsPageRoutingModule {}
