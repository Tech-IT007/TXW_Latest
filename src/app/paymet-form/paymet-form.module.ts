import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymetFormPageRoutingModule } from './paymet-form-routing.module';

import { PaymetFormPage } from './paymet-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymetFormPageRoutingModule
  ],
  declarations: [PaymetFormPage]
})
export class PaymetFormPageModule {}
