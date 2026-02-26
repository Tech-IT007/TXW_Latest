import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmSubmitTicketsPageRoutingModule } from './ppm-submit-tickets-routing.module';

import { PpmSubmitTicketsPage } from './ppm-submit-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmSubmitTicketsPageRoutingModule
  ],
  declarations: [PpmSubmitTicketsPage]
})
export class PpmSubmitTicketsPageModule {}
