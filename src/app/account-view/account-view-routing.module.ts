import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountViewPage } from './account-view.page';

const routes: Routes = [
  {
    path: '',
    component: AccountViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountViewPageRoutingModule {}
