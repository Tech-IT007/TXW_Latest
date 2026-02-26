import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountApprovelDetailsByIdPage } from './account-approvel-details-by-id.page';

const routes: Routes = [
  {
    path: '',
    component: AccountApprovelDetailsByIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountApprovelDetailsByIdPageRoutingModule {}
