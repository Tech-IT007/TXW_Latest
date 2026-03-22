import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StateTransferMoneyPageRoutingModule } from './state-transfer-money-routing.module';

import { StateTransferMoneyPage } from './state-transfer-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateTransferMoneyPageRoutingModule
  ],
  declarations: [StateTransferMoneyPage]
})
export class StateTransferMoneyPageModule {}
