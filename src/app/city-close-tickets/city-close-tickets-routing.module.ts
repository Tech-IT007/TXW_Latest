import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityCloseTicketsPage } from './city-close-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CityCloseTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityCloseTicketsPageRoutingModule {}
