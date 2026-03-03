import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinencePaymentApprovelDetailsPageRoutingModule } from './finence-payment-approvel-details-routing.module';

import { FinencePaymentApprovelDetailsPage } from './finence-payment-approvel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinencePaymentApprovelDetailsPageRoutingModule
  ],
  declarations: [FinencePaymentApprovelDetailsPage]
})
export class FinencePaymentApprovelDetailsPageModule {}
