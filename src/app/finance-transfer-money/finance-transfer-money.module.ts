import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceTransferMoneyPageRoutingModule } from './finance-transfer-money-routing.module';

import { FinanceTransferMoneyPage } from './finance-transfer-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceTransferMoneyPageRoutingModule
  ],
  declarations: [FinanceTransferMoneyPage]
})
export class FinanceTransferMoneyPageModule {}
