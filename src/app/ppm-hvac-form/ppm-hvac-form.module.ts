import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmHvacFormPageRoutingModule } from './ppm-hvac-form-routing.module';

import { PpmHvacFormPage } from './ppm-hvac-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmHvacFormPageRoutingModule
  ],
  declarations: [PpmHvacFormPage]
})
export class PpmHvacFormPageModule {}
