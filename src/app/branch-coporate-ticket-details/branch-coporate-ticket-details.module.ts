import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchCoporateTicketDetailsPageRoutingModule } from './branch-coporate-ticket-details-routing.module';

import { BranchCoporateTicketDetailsPage } from './branch-coporate-ticket-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchCoporateTicketDetailsPageRoutingModule
  ],
  declarations: [BranchCoporateTicketDetailsPage]
})
export class BranchCoporateTicketDetailsPageModule {}
