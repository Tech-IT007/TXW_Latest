import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountConvenceChargePage } from './account-convence-charge.page';

const routes: Routes = [
  {
    path: '',
    component: AccountConvenceChargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountConvenceChargePageRoutingModule {}
