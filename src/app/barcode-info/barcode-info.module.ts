import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeInfoPageRoutingModule } from './barcode-info-routing.module';

import { BarcodeInfoPage } from './barcode-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeInfoPageRoutingModule
  ],
  declarations: [BarcodeInfoPage]
})
export class BarcodeInfoPageModule {}
