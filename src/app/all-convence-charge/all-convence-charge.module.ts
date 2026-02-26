import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllConvenceChargePageRoutingModule } from './all-convence-charge-routing.module';

import { AllConvenceChargePage } from './all-convence-charge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllConvenceChargePageRoutingModule
  ],
  declarations: [AllConvenceChargePage]
})
export class AllConvenceChargePageModule {}
