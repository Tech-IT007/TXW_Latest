import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tseting23PageRoutingModule } from './tseting23-routing.module';

import { Tseting23Page } from './tseting23.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tseting23PageRoutingModule
  ],
  declarations: [Tseting23Page]
})
export class Tseting23PageModule {}
