import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQuationPage } from './create-quation.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQuationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuationPageRoutingModule {}
