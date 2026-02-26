import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesboardViewCorporatePage } from './desboard-view-corporate.page';

const routes: Routes = [
  {
    path: '',
    component: DesboardViewCorporatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesboardViewCorporatePageRoutingModule {}
