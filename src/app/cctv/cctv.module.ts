import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CCTVPageRoutingModule } from './cctv-routing.module';

import { CCTVPage } from './cctv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CCTVPageRoutingModule
  ],
  declarations: [CCTVPage]
})
export class CCTVPageModule {}
