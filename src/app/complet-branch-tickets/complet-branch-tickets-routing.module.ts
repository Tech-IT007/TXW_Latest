import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletBranchTicketsPage } from './complet-branch-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CompletBranchTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletBranchTicketsPageRoutingModule {}
