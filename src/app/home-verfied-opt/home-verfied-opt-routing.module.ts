import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeVerfiedOptPage } from './home-verfied-opt.page';

const routes: Routes = [
  {
    path: '',
    component: HomeVerfiedOptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeVerfiedOptPageRoutingModule {}
