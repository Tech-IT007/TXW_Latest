import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorBookingPageRoutingModule } from './visitor-booking-routing.module';

import { VisitorBookingPage } from './visitor-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorBookingPageRoutingModule
  ],
  declarations: [VisitorBookingPage]
})
export class VisitorBookingPageModule {}
