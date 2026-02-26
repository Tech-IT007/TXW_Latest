import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmShowHistoryPage } from './ppm-show-history.page';

const routes: Routes = [
  {
    path: '',
    component: PpmShowHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmShowHistoryPageRoutingModule {}
