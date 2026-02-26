import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmAccountViewDetailsPage } from './ppm-account-view-details.page';

const routes: Routes = [
  {
    path: '',
    component: PpmAccountViewDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmAccountViewDetailsPageRoutingModule {}
