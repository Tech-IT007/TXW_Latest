import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CfoQuotationApprovelDetailsPageRoutingModule } from './cfo-quotation-approvel-details-routing.module';

import { CfoQuotationApprovelDetailsPage } from './cfo-quotation-approvel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CfoQuotationApprovelDetailsPageRoutingModule
  ],
  declarations: [CfoQuotationApprovelDetailsPage]
})
export class CfoQuotationApprovelDetailsPageModule {}
