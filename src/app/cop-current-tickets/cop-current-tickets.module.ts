import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CopCurrentTicketsPageRoutingModule } from './cop-current-tickets-routing.module';

import { CopCurrentTicketsPage } from './cop-current-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    FormsModule,
    IonicModule,
    CopCurrentTicketsPageRoutingModule
  ],
  declarations: [CopCurrentTicketsPage]
})
export class CopCurrentTicketsPageModule {}
