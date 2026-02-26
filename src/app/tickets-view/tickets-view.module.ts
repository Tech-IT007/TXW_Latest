import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsViewPageRoutingModule } from './tickets-view-routing.module';

import { TicketsViewPage } from './tickets-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsViewPageRoutingModule
  ],
  declarations: [TicketsViewPage]
})
export class TicketsViewPageModule {}
