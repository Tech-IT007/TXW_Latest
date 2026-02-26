import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCarePage } from './home-care.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCarePageRoutingModule {}
