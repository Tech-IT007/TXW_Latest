import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorprateCityLeadPage } from './corprate-city-lead.page';

const routes: Routes = [
  {
    path: '',
    component: CorprateCityLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorprateCityLeadPageRoutingModule {}
