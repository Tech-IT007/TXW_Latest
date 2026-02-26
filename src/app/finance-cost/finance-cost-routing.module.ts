import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceCostPage } from './finance-cost.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceCostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceCostPageRoutingModule {}
