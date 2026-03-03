import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CFOPaymentApprovelPageRoutingModule } from './cfo-payment-approvel-routing.module';

import { CFOPaymentApprovelPage } from './cfo-payment-approvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CFOPaymentApprovelPageRoutingModule
  ],
  declarations: [CFOPaymentApprovelPage]
})
export class CFOPaymentApprovelPageModule {}
