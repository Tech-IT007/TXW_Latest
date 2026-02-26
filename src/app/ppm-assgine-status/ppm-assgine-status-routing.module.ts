import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmAssgineStatusPage } from './ppm-assgine-status.page';

const routes: Routes = [
  {
    path: '',
    component: PpmAssgineStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmAssgineStatusPageRoutingModule {}
