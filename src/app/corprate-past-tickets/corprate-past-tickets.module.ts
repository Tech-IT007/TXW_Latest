import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorpratePastTicketsPageRoutingModule } from './corprate-past-tickets-routing.module';

import { CorpratePastTicketsPage } from './corprate-past-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorpratePastTicketsPageRoutingModule
  ],
  declarations: [CorpratePastTicketsPage]
})
export class CorpratePastTicketsPageModule {}
