import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CfoQuotationApprovelPageRoutingModule } from './cfo-quotation-approvel-routing.module';

import { CfoQuotationApprovelPage } from './cfo-quotation-approvel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CfoQuotationApprovelPageRoutingModule
  ],
  declarations: [CfoQuotationApprovelPage]
})
export class CfoQuotationApprovelPageModule {}
