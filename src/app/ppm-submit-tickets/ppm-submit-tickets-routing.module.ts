import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmSubmitTicketsPage } from './ppm-submit-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: PpmSubmitTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmSubmitTicketsPageRoutingModule {}
