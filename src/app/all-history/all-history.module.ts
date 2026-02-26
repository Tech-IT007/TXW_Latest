import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllHistoryPageRoutingModule } from './all-history-routing.module';

import { AllHistoryPage } from './all-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllHistoryPageRoutingModule
  ],
  declarations: [AllHistoryPage]
})
export class AllHistoryPageModule {}
