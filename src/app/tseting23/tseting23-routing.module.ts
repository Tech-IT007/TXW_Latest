import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tseting23Page } from './tseting23.page';

const routes: Routes = [
  {
    path: '',
    component: Tseting23Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tseting23PageRoutingModule {}
