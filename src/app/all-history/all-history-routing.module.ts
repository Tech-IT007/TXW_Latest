import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllHistoryPage } from './all-history.page';

const routes: Routes = [
  {
    path: '',
    component: AllHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllHistoryPageRoutingModule {}
