import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DpList2Page } from './dp-list2.page';

const routes: Routes = [
  {
    path: '',
    component: DpList2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DpList2PageRoutingModule {}
