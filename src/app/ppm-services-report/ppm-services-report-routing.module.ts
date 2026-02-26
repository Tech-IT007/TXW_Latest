import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmServicesReportPage } from './ppm-services-report.page';

const routes: Routes = [
  {
    path: '',
    component: PpmServicesReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmServicesReportPageRoutingModule {}
