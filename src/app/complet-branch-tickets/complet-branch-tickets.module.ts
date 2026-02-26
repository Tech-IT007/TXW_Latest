import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletBranchTicketsPageRoutingModule } from './complet-branch-tickets-routing.module';

import { CompletBranchTicketsPage } from './complet-branch-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletBranchTicketsPageRoutingModule
  ],
  declarations: [CompletBranchTicketsPage]
})
export class CompletBranchTicketsPageModule {}
