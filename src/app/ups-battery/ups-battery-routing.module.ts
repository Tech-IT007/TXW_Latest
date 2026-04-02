import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UPSBATTERYPage } from './ups-battery.page';

const routes: Routes = [
  {
    path: '',
    component: UPSBATTERYPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UPSBATTERYPageRoutingModule {}
