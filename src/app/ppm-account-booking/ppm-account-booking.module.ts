import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmAccountBookingPageRoutingModule } from './ppm-account-booking-routing.module';

import { PpmAccountBookingPage } from './ppm-account-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmAccountBookingPageRoutingModule
  ],
  declarations: [PpmAccountBookingPage]
})
export class PpmAccountBookingPageModule {}
