import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPaymentDetailsPageRoutingModule } from './all-payment-details-routing.module';

import { AllPaymentDetailsPage } from './all-payment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPaymentDetailsPageRoutingModule
  ],
  declarations: [AllPaymentDetailsPage]
})
export class AllPaymentDetailsPageModule {}
