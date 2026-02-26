import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmVendorStatusPageRoutingModule } from './ppm-vendor-status-routing.module';
import { IonSelectSearchLibModule } from 'ionic-select-search';
import { PpmVendorStatusPage } from './ppm-vendor-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonSelectSearchLibModule ,
    PpmVendorStatusPageRoutingModule
  ],
  declarations: [PpmVendorStatusPage]
})
export class PpmVendorStatusPageModule {}
