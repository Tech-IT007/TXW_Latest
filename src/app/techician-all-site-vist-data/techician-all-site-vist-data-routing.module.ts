import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechicianAllSiteVistDataPage } from './techician-all-site-vist-data.page';

const routes: Routes = [
  {
    path: '',
    component: TechicianAllSiteVistDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechicianAllSiteVistDataPageRoutingModule {}
