import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCityLeadPage } from './home-city-lead.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCityLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCityLeadPageRoutingModule {}
