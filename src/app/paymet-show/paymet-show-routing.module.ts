import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymetShowPage } from './paymet-show.page';

const routes: Routes = [
  {
    path: '',
    component: PaymetShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymetShowPageRoutingModule {}
