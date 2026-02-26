import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerficationOtpPage } from './verfication-otp.page';

const routes: Routes = [
  {
    path: '',
    component: VerficationOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerficationOtpPageRoutingModule {}
