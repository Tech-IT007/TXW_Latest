import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentApprovelDetailsPageRoutingModule } from './payment-approvel-details-routing.module';

import { PaymentApprovelDetailsPage } from './payment-approvel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentApprovelDetailsPageRoutingModule
  ],
  declarations: [PaymentApprovelDetailsPage]
})
export class PaymentApprovelDetailsPageModule {}
