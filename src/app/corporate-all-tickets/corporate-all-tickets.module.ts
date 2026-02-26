import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorporateAllTicketsPageRoutingModule } from './corporate-all-tickets-routing.module';

import { CorporateAllTicketsPage } from './corporate-all-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorporateAllTicketsPageRoutingModule
  ],
  declarations: [CorporateAllTicketsPage]
})
export class CorporateAllTicketsPageModule {}
