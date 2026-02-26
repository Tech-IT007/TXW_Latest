import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorBookingPage } from './visitor-booking.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorBookingPageRoutingModule {}
