import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountViewDetailsPage } from './account-view-details.page';

const routes: Routes = [
  {
    path: '',
    component: AccountViewDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountViewDetailsPageRoutingModule {}
