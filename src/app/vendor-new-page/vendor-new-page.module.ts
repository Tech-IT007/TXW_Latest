import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorNewPagePageRoutingModule } from './vendor-new-page-routing.module';

import { VendorNewPagePage } from './vendor-new-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorNewPagePageRoutingModule
  ],
  declarations: [VendorNewPagePage]
})
export class VendorNewPagePageModule {}
