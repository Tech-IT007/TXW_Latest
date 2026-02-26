import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityViewPageRoutingModule } from './city-view-routing.module';

import { CityViewPage } from './city-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityViewPageRoutingModule
  ],
  declarations: [CityViewPage]
})
export class CityViewPageModule {}
