import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmHvacFormPage } from './ppm-hvac-form.page';

const routes: Routes = [
  {
    path: '',
    component: PpmHvacFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmHvacFormPageRoutingModule {}
