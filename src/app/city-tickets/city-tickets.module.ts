import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityTicketsPageRoutingModule } from './city-tickets-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CityTicketsPage } from './city-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule ,
    IonicModule,
    CityTicketsPageRoutingModule
  ],
  declarations: [CityTicketsPage]
})
export class CityTicketsPageModule {}
