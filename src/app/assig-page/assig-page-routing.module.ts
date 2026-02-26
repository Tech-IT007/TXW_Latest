import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssigPagePage } from './assig-page.page';

const routes: Routes = [
  {
    path: '',
    component: AssigPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssigPagePageRoutingModule {}
