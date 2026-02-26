import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorSeclectBranchPage } from './visitor-seclect-branch.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorSeclectBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorSeclectBranchPageRoutingModule {}
