import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountConvenceChargePageRoutingModule } from './account-convence-charge-routing.module';

import { AccountConvenceChargePage } from './account-convence-charge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountConvenceChargePageRoutingModule
  ],
  declarations: [AccountConvenceChargePage]
})
export class AccountConvenceChargePageModule {}
