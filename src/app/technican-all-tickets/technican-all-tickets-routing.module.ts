import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicanAllTicketsPage } from './technican-all-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicanAllTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicanAllTicketsPageRoutingModule {}
