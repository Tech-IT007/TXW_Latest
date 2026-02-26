import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CCTVPage } from './cctv.page';

const routes: Routes = [
  {
    path: '',
    component: CCTVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CCTVPageRoutingModule {}
