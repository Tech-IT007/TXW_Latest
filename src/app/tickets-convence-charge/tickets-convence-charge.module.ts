import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsConvenceChargePageRoutingModule } from './tickets-convence-charge-routing.module';

import { TicketsConvenceChargePage } from './tickets-convence-charge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsConvenceChargePageRoutingModule
  ],
  declarations: [TicketsConvenceChargePage]
})
export class TicketsConvenceChargePageModule {}
