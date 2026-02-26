import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmAssgineStatusPageRoutingModule } from './ppm-assgine-status-routing.module';
import { IonSelectSearchLibModule } from 'ionic-select-search';
import { PpmAssgineStatusPage } from './ppm-assgine-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonSelectSearchLibModule ,
    IonicModule,
    PpmAssgineStatusPageRoutingModule
  ],
  declarations: [PpmAssgineStatusPage]
})
export class PpmAssgineStatusPageModule {}
