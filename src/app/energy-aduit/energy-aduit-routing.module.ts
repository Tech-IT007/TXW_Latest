import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergyAduitPage } from './energy-aduit.page';

const routes: Routes = [
  {
    path: '',
    component: EnergyAduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergyAduitPageRoutingModule {}
