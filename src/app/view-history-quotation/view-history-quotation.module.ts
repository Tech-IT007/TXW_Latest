import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHistoryQuotationPageRoutingModule } from './view-history-quotation-routing.module';

import { ViewHistoryQuotationPage } from './view-history-quotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewHistoryQuotationPageRoutingModule
  ],
  declarations: [ViewHistoryQuotationPage]
})
export class ViewHistoryQuotationPageModule {}
