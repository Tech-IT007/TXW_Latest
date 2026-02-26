import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPaymentShowPageRoutingModule } from './all-payment-show-routing.module';

import { AllPaymentShowPage } from './all-payment-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPaymentShowPageRoutingModule
  ],
  declarations: [AllPaymentShowPage]
})
export class AllPaymentShowPageModule {}
