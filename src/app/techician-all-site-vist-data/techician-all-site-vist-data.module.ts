import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechicianAllSiteVistDataPageRoutingModule } from './techician-all-site-vist-data-routing.module';

import { TechicianAllSiteVistDataPage } from './techician-all-site-vist-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechicianAllSiteVistDataPageRoutingModule
  ],
  declarations: [TechicianAllSiteVistDataPage]
})
export class TechicianAllSiteVistDataPageModule {}
