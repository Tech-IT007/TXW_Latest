import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsViewPage } from './tickets-view.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsViewPageRoutingModule {}
