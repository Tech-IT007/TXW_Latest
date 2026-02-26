import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCompletTicketsPageRoutingModule } from './home-complet-tickets-routing.module';

import { HomeCompletTicketsPage } from './home-complet-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCompletTicketsPageRoutingModule
  ],
  declarations: [HomeCompletTicketsPage]
})
export class HomeCompletTicketsPageModule {}
