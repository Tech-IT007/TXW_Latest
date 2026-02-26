import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotationApproveAllTicketsPageRoutingModule } from './quotation-approve-all-tickets-routing.module';

import { QuotationApproveAllTicketsPage } from './quotation-approve-all-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotationApproveAllTicketsPageRoutingModule
  ],
  declarations: [QuotationApproveAllTicketsPage]
})
export class QuotationApproveAllTicketsPageModule {}
