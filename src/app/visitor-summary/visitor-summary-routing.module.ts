import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorSummaryPage } from './visitor-summary.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorSummaryPageRoutingModule {}
