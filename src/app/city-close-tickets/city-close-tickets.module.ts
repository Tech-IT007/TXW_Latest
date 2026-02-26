import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityCloseTicketsPageRoutingModule } from './city-close-tickets-routing.module';

import { CityCloseTicketsPage } from './city-close-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityCloseTicketsPageRoutingModule
  ],
  declarations: [CityCloseTicketsPage]
})
export class CityCloseTicketsPageModule {}
