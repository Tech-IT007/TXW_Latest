import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmViewDetailsPage } from './ppm-view-details.page';

const routes: Routes = [
  {
    path: '',
    component: PpmViewDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmViewDetailsPageRoutingModule {}
