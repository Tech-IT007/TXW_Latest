import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsConvenceChargePage } from './tickets-convence-charge.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsConvenceChargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsConvenceChargePageRoutingModule {}
