import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyworkZonePageRoutingModule } from './mywork-zone-routing.module';

import { MyworkZonePage } from './mywork-zone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyworkZonePageRoutingModule
  ],
  declarations: [MyworkZonePage]
})
export class MyworkZonePageModule {}
