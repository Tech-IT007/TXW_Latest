import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerficationOtpPageRoutingModule } from './verfication-otp-routing.module';

import { VerficationOtpPage } from './verfication-otp.page';

@NgModule({
  imports: [
    CommonModule,
 
    FormsModule,
    IonicModule,
    VerficationOtpPageRoutingModule
  ],
  declarations: [VerficationOtpPage]
})
export class VerficationOtpPageModule {}
