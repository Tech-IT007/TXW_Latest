import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprFormPage } from './dpr-form.page';

const routes: Routes = [
  {
    path: '',
    component: DprFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprFormPageRoutingModule {}
