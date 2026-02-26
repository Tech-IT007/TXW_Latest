import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianVistFormPageRoutingModule } from './technician-vist-form-routing.module';

import { TechnicianVistFormPage } from './technician-vist-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicianVistFormPageRoutingModule
  ],
  declarations: [TechnicianVistFormPage]
})
export class TechnicianVistFormPageModule {}
