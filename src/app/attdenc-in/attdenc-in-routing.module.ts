import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttdencINPage } from './attdenc-in.page';

const routes: Routes = [
  {
    path: '',
    component: AttdencINPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttdencINPageRoutingModule {}
