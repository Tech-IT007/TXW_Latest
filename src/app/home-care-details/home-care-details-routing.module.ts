import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCareDetailsPage } from './home-care-details.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCareDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCareDetailsPageRoutingModule {}
