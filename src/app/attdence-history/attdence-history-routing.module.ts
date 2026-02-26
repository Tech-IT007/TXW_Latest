import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttdenceHistoryPage } from './attdence-history.page';

const routes: Routes = [
  {
    path: '',
    component: AttdenceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttdenceHistoryPageRoutingModule {}
