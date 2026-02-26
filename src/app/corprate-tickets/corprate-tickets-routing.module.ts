import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorprateTicketsPage } from './corprate-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CorprateTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorprateTicketsPageRoutingModule {}
