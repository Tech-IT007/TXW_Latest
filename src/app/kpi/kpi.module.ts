import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KPIPageRoutingModule } from './kpi-routing.module';

import { KPIPage } from './kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KPIPageRoutingModule
  ],
  declarations: [KPIPage]
})
export class KPIPageModule {}
