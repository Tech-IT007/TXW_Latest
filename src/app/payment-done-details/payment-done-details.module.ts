import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDoneDetailsPageRoutingModule } from './payment-done-details-routing.module';

import { PaymentDoneDetailsPage } from './payment-done-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDoneDetailsPageRoutingModule
  ],
  declarations: [PaymentDoneDetailsPage]
})
export class PaymentDoneDetailsPageModule {}
