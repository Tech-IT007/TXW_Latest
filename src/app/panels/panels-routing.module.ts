import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelsPage } from './panels.page';

const routes: Routes = [
  {
    path: '',
    component: PanelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelsPageRoutingModule {}
