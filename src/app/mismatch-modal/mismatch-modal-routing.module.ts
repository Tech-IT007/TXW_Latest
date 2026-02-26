import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MismatchModalPage } from './mismatch-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MismatchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MismatchModalPageRoutingModule {}
