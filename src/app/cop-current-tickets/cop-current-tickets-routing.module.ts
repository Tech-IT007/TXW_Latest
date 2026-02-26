import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopCurrentTicketsPage } from './cop-current-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CopCurrentTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopCurrentTicketsPageRoutingModule {}
