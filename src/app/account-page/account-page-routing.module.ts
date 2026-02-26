import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPagePage } from './account-page.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPagePageRoutingModule {}
