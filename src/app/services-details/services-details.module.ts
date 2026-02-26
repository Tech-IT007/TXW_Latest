import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesDetailsPageRoutingModule } from './services-details-routing.module';

import { ServicesDetailsPage } from './services-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesDetailsPageRoutingModule
  ],
  declarations: [ServicesDetailsPage]
})
export class ServicesDetailsPageModule {}
