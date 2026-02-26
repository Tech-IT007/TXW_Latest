import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorClintDetailsPage } from './visitor-clint-details.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorClintDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorClintDetailsPageRoutingModule {}
