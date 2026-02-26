import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentApprovelPageRoutingModule } from './payment-approvel-routing.module';

import { PaymentApprovelPage } from './payment-approvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentApprovelPageRoutingModule
  ],
  declarations: [PaymentApprovelPage]
})
export class PaymentApprovelPageModule {}
