import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCityLeadPageRoutingModule } from './home-city-lead-routing.module';

import { HomeCityLeadPage } from './home-city-lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCityLeadPageRoutingModule
  ],
  declarations: [HomeCityLeadPage]
})
export class HomeCityLeadPageModule {}
