import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorprateCityLeadPageRoutingModule } from './corprate-city-lead-routing.module';

import { CorprateCityLeadPage } from './corprate-city-lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorprateCityLeadPageRoutingModule
  ],
  declarations: [CorprateCityLeadPage]
})
export class CorprateCityLeadPageModule {}
