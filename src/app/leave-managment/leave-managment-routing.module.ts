import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveManagmentPage } from './leave-managment.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveManagmentPageRoutingModule {}
