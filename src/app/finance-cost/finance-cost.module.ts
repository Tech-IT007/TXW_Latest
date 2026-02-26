import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceCostPageRoutingModule } from './finance-cost-routing.module';

import { FinanceCostPage } from './finance-cost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceCostPageRoutingModule
  ],
  declarations: [FinanceCostPage]
})
export class FinanceCostPageModule {}
