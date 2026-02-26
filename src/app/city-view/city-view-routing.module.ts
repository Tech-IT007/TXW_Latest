import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityViewPage } from './city-view.page';

const routes: Routes = [
  {
    path: '',
    component: CityViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityViewPageRoutingModule {}
