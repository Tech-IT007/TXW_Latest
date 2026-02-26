import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KPIPage } from './kpi.page';

const routes: Routes = [
  {
    path: '',
    component: KPIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KPIPageRoutingModule {}
