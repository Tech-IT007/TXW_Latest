import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergyTypePage } from './energy-type.page';

const routes: Routes = [
  {
    path: '',
    component: EnergyTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergyTypePageRoutingModule {}
