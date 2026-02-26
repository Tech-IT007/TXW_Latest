import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmPastTicketsPage } from './ppm-past-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: PpmPastTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmPastTicketsPageRoutingModule {}
