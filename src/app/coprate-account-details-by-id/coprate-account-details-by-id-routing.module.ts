import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoprateAccountDetailsByIdPage } from './coprate-account-details-by-id.page';

const routes: Routes = [
  {
    path: '',
    component: CoprateAccountDetailsByIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoprateAccountDetailsByIdPageRoutingModule {}
