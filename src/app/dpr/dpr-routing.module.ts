import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DPRPage } from './dpr.page';

const routes: Routes = [
  {
    path: '',
    component: DPRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DPRPageRoutingModule {}
