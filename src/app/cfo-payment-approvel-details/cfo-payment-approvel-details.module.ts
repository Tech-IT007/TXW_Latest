import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CFOPaymentApprovelDetailsPageRoutingModule } from './cfo-payment-approvel-details-routing.module';

import { CFOPaymentApprovelDetailsPage } from './cfo-payment-approvel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CFOPaymentApprovelDetailsPageRoutingModule
  ],
  declarations: [CFOPaymentApprovelDetailsPage]
})
export class CFOPaymentApprovelDetailsPageModule {}
