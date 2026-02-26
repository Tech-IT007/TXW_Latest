import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewHistoryQuotationPage } from './view-history-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHistoryQuotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewHistoryQuotationPageRoutingModule {}
