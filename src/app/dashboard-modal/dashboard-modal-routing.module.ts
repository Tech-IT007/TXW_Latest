import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardModalPage } from './dashboard-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModalPageRoutingModule {}
