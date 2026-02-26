import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitSparePartPage } from './submit-spare-part.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitSparePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitSparePartPageRoutingModule {}
