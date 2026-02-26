import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScanningPageRoutingModule } from './barcode-scanning-routing.module';

import { BarcodeScanningPage } from './barcode-scanning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScanningPageRoutingModule
  ],
  declarations: [BarcodeScanningPage]
})
export class BarcodeScanningPageModule {}
