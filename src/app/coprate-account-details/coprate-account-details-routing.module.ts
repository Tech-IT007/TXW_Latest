import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoprateAccountDetailsPage } from './coprate-account-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoprateAccountDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoprateAccountDetailsPageRoutingModule {}
