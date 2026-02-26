import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmAccountViewDetailsPageRoutingModule } from './ppm-account-view-details-routing.module';

import { PpmAccountViewDetailsPage } from './ppm-account-view-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmAccountViewDetailsPageRoutingModule
  ],
  declarations: [PpmAccountViewDetailsPage]
})
export class PpmAccountViewDetailsPageModule {}
