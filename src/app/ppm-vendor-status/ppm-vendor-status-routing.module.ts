import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmVendorStatusPage } from './ppm-vendor-status.page';

const routes: Routes = [
  {
    path: '',
    component: PpmVendorStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmVendorStatusPageRoutingModule {}
