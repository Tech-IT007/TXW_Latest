import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeshbordViewDetailsPage } from './deshbord-view-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeshbordViewDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeshbordViewDetailsPageRoutingModule {}
