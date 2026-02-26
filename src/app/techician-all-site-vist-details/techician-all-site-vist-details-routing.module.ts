import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechicianAllSiteVistDetailsPage } from './techician-all-site-vist-details.page';

const routes: Routes = [
  {
    path: '',
    component: TechicianAllSiteVistDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechicianAllSiteVistDetailsPageRoutingModule {}
