import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechicianAllSiteVistDetailsPageRoutingModule } from './techician-all-site-vist-details-routing.module';

import { TechicianAllSiteVistDetailsPage } from './techician-all-site-vist-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechicianAllSiteVistDetailsPageRoutingModule
  ],
  declarations: [TechicianAllSiteVistDetailsPage]
})
export class TechicianAllSiteVistDetailsPageModule {}
