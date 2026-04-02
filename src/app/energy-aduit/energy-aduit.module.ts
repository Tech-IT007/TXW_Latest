import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnergyAduitPageRoutingModule } from './energy-aduit-routing.module';

import { EnergyAduitPage } from './energy-aduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnergyAduitPageRoutingModule
  ],
  declarations: [EnergyAduitPage]
})
export class EnergyAduitPageModule {}
