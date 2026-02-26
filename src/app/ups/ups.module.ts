import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UPSPageRoutingModule } from './ups-routing.module';

import { UPSPage } from './ups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UPSPageRoutingModule
  ],
  declarations: [UPSPage]
})
export class UPSPageModule {}
