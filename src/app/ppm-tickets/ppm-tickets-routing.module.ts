import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmTicketsPage } from './ppm-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: PpmTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmTicketsPageRoutingModule {}
