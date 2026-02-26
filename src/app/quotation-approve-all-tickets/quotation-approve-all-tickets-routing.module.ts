import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotationApproveAllTicketsPage } from './quotation-approve-all-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: QuotationApproveAllTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationApproveAllTicketsPageRoutingModule {}
