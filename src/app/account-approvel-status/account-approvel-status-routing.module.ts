import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountApprovelStatusPage } from './account-approvel-status.page';

const routes: Routes = [
  {
    path: '',
    component: AccountApprovelStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountApprovelStatusPageRoutingModule {}
