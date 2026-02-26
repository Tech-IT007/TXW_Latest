import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveChartPage } from './leave-chart.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveChartPageRoutingModule {}
