import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HVACFormPage } from './hvac-form.page';

const routes: Routes = [
  {
    path: '',
    component: HVACFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HVACFormPageRoutingModule {}
