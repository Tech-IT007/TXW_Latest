import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountTicketsPage } from './account-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: AccountTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountTicketsPageRoutingModule {}
