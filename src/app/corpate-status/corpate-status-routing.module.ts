import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorpateStatusPage } from './corpate-status.page';

const routes: Routes = [
  {
    path: '',
    component: CorpateStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorpateStatusPageRoutingModule {}
