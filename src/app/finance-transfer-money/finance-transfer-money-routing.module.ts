import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceTransferMoneyPage } from './finance-transfer-money.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceTransferMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceTransferMoneyPageRoutingModule {}
