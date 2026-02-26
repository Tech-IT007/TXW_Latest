import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesReportPageRoutingModule } from './services-report-routing.module';

import { ServicesReportPage } from './services-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesReportPageRoutingModule
  ],
  declarations: [ServicesReportPage]
})
export class ServicesReportPageModule {}
