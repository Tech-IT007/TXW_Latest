import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechniceanCreateVistPage } from './technicean-create-vist.page';

const routes: Routes = [
  {
    path: '',
    component: TechniceanCreateVistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechniceanCreateVistPageRoutingModule {}
