import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPpmTickestPage } from './all-ppm-tickest.page';

const routes: Routes = [
  {
    path: '',
    component: AllPpmTickestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPpmTickestPageRoutingModule {}
