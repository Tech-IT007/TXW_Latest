import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireCheckListPage } from './fire-check-list.page';

const routes: Routes = [
  {
    path: '',
    component: FireCheckListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireCheckListPageRoutingModule {}
