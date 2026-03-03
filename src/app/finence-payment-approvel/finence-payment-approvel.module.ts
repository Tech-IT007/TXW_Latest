import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinencePaymentApprovelPageRoutingModule } from './finence-payment-approvel-routing.module';

import { FinencePaymentApprovelPage } from './finence-payment-approvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinencePaymentApprovelPageRoutingModule
  ],
  declarations: [FinencePaymentApprovelPage]
})
export class FinencePaymentApprovelPageModule {}
