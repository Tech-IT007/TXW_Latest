import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchAccountPaymentDetailsPageRoutingModule } from './branch-account-payment-details-routing.module';

import { BranchAccountPaymentDetailsPage } from './branch-account-payment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchAccountPaymentDetailsPageRoutingModule
  ],
  declarations: [BranchAccountPaymentDetailsPage]
})
export class BranchAccountPaymentDetailsPageModule {}
