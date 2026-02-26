import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountVistFormPage } from './account-vist-form.page';

const routes: Routes = [
  {
    path: '',
    component: AccountVistFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVistFormPageRoutingModule {}
