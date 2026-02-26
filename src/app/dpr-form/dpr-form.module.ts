import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprFormPageRoutingModule } from './dpr-form-routing.module';

import { DprFormPage } from './dpr-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DprFormPageRoutingModule
  ],
  declarations: [DprFormPage]
})
export class DprFormPageModule {}
