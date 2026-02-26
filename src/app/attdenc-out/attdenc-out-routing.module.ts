import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttdencOUTPage } from './attdenc-out.page';

const routes: Routes = [
  {
    path: '',
    component: AttdencOUTPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttdencOUTPageRoutingModule {}
