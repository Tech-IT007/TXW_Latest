import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorAllTicketsPage } from './visitor-all-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorAllTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorAllTicketsPageRoutingModule {}
