import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UPSBATTERYPageRoutingModule } from './ups-battery-routing.module';

import { UPSBATTERYPage } from './ups-battery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UPSBATTERYPageRoutingModule
  ],
  declarations: [UPSBATTERYPage]
})
export class UPSBATTERYPageModule {}
