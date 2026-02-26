import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchAccountPaymentFormPageRoutingModule } from './branch-account-payment-form-routing.module';

import { BranchAccountPaymentFormPage } from './branch-account-payment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchAccountPaymentFormPageRoutingModule
  ],
  declarations: [BranchAccountPaymentFormPage]
})
export class BranchAccountPaymentFormPageModule {}
