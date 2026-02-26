import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerfiedResetPasswordPage } from './verfied-reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: VerfiedResetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerfiedResetPasswordPageRoutingModule {}
