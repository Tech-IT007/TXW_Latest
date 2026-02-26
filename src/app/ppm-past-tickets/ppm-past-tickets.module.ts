import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmPastTicketsPageRoutingModule } from './ppm-past-tickets-routing.module';

import { PpmPastTicketsPage } from './ppm-past-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmPastTicketsPageRoutingModule
  ],
  declarations: [PpmPastTicketsPage]
})
export class PpmPastTicketsPageModule {}
