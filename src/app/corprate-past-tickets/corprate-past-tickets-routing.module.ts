import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorpratePastTicketsPage } from './corprate-past-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CorpratePastTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorpratePastTicketsPageRoutingModule {}
