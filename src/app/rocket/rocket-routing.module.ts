import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RocketPage } from './rocket.page';

const routes: Routes = [
  {
    path: '',
    component: RocketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RocketPageRoutingModule {}
