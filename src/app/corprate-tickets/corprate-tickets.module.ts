import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorprateTicketsPageRoutingModule } from './corprate-tickets-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CorprateTicketsPage } from './corprate-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    CorprateTicketsPageRoutingModule
  ],
  declarations: [CorprateTicketsPage]
})
export class CorprateTicketsPageModule {}
