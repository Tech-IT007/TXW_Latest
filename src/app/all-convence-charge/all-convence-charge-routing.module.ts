import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllConvenceChargePage } from './all-convence-charge.page';

const routes: Routes = [
  {
    path: '',
    component: AllConvenceChargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllConvenceChargePageRoutingModule {}
