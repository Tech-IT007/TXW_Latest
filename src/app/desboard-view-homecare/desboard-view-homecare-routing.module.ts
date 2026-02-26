import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesboardViewHomecarePage } from './desboard-view-homecare.page';

const routes: Routes = [
  {
    path: '',
    component: DesboardViewHomecarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesboardViewHomecarePageRoutingModule {}
