import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelsPageRoutingModule } from './panels-routing.module';

import { PanelsPage } from './panels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelsPageRoutingModule
  ],
  declarations: [PanelsPage]
})
export class PanelsPageModule {}
