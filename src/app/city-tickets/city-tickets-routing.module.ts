import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityTicketsPage } from './city-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CityTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityTicketsPageRoutingModule {}
