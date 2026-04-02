import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnergyTypePageRoutingModule } from './energy-type-routing.module';

import { EnergyTypePage } from './energy-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnergyTypePageRoutingModule
  ],
  declarations: [EnergyTypePage]
})
export class EnergyTypePageModule {}
