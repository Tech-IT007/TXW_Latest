import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmServicesReportPageRoutingModule } from './ppm-services-report-routing.module';

import { PpmServicesReportPage } from './ppm-services-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmServicesReportPageRoutingModule
  ],
  declarations: [PpmServicesReportPage]
})
export class PpmServicesReportPageModule {}
