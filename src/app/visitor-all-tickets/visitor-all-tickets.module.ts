import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorAllTicketsPageRoutingModule } from './visitor-all-tickets-routing.module';

import { VisitorAllTicketsPage } from './visitor-all-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorAllTicketsPageRoutingModule
  ],
  declarations: [VisitorAllTicketsPage]
})
export class VisitorAllTicketsPageModule {}
