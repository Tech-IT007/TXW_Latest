import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptSubmitPage } from './opt-submit.page';

const routes: Routes = [
  {
    path: '',
    component: OptSubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptSubmitPageRoutingModule {}
