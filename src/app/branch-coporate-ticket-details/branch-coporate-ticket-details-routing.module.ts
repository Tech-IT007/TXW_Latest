import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchCoporateTicketDetailsPage } from './branch-coporate-ticket-details.page';

const routes: Routes = [
  {
    path: '',
    component: BranchCoporateTicketDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchCoporateTicketDetailsPageRoutingModule {}
