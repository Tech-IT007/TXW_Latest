import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DPRPageRoutingModule } from './dpr-routing.module';

import { DPRPage } from './dpr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DPRPageRoutingModule
  ],
  declarations: [DPRPage]
})
export class DPRPageModule {}
