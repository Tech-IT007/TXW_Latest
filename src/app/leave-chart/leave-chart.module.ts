import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveChartPageRoutingModule } from './leave-chart-routing.module';

import { LeaveChartPage } from './leave-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveChartPageRoutingModule
  ],
  declarations: [LeaveChartPage]
})
export class LeaveChartPageModule {}
