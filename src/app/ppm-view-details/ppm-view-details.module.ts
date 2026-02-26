import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmViewDetailsPageRoutingModule } from './ppm-view-details-routing.module';

import { PpmViewDetailsPage } from './ppm-view-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmViewDetailsPageRoutingModule
  ],
  declarations: [PpmViewDetailsPage]
})
export class PpmViewDetailsPageModule {}
