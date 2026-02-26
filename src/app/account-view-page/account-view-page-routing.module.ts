import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountViewPagePage } from './account-view-page.page';

const routes: Routes = [
  {
    path: '',
    component: AccountViewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountViewPagePageRoutingModule {}
