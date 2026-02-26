import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuationPageRoutingModule } from './create-quation-routing.module';

import { CreateQuationPage } from './create-quation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuationPageRoutingModule
  ],
  declarations: [CreateQuationPage]
})
export class CreateQuationPageModule {}
