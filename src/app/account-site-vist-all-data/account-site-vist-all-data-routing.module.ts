import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSiteVistAllDataPage } from './account-site-vist-all-data.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSiteVistAllDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSiteVistAllDataPageRoutingModule {}
