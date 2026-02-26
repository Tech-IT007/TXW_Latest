import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSiteVistPage } from './account-site-vist.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSiteVistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSiteVistPageRoutingModule {}
