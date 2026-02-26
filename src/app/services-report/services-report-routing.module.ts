import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesReportPage } from './services-report.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesReportPageRoutingModule {}
