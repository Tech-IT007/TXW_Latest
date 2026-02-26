import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HVACFormPageRoutingModule } from './hvac-form-routing.module';

import { HVACFormPage } from './hvac-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HVACFormPageRoutingModule
  ],
  declarations: [HVACFormPage]
})
export class HVACFormPageModule {}
