import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargePageRoutingModule } from './charge-routing.module';

import { ChargePage } from './charge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargePageRoutingModule
  ],
  declarations: [ChargePage]
})
export class ChargePageModule {}
