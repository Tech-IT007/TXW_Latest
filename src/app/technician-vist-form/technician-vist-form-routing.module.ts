import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianVistFormPage } from './technician-vist-form.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianVistFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianVistFormPageRoutingModule {}
