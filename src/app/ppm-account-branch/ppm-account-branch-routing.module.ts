import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpmAccountBranchPage } from './ppm-account-branch.page';

const routes: Routes = [
  {
    path: '',
    component: PpmAccountBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpmAccountBranchPageRoutingModule {}
