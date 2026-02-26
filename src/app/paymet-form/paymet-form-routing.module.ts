import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymetFormPage } from './paymet-form.page';

const routes: Routes = [
  {
    path: '',
    component: PaymetFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymetFormPageRoutingModule {}
