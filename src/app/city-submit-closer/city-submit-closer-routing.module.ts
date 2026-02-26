import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitySubmitCloserPage } from './city-submit-closer.page';

const routes: Routes = [
  {
    path: '',
    component: CitySubmitCloserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitySubmitCloserPageRoutingModule {}
