import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmTicketsPageRoutingModule } from './ppm-tickets-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PpmTicketsPage } from './ppm-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    PpmTicketsPageRoutingModule
  ],
  declarations: [PpmTicketsPage]
})
export class PpmTicketsPageModule {}
