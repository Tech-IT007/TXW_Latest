import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountBranchTicketsPage } from './account-branch-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: AccountBranchTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountBranchTicketsPageRoutingModule {}
