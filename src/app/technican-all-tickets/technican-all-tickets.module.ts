import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicanAllTicketsPageRoutingModule } from './technican-all-tickets-routing.module';

import { TechnicanAllTicketsPage } from './technican-all-tickets.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
       Ng2SearchPipeModule,
    TechnicanAllTicketsPageRoutingModule
  ],
  declarations: [TechnicanAllTicketsPage]
})
export class TechnicanAllTicketsPageModule {}
