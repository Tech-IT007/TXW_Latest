import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifiedHomeCarePage } from './verified-home-care.page';

const routes: Routes = [
  {
    path: '',
    component: VerifiedHomeCarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifiedHomeCarePageRoutingModule {}
