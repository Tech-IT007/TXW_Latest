import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttdenceHistoryPageRoutingModule } from './attdence-history-routing.module';

import { AttdenceHistoryPage } from './attdence-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttdenceHistoryPageRoutingModule
  ],
  declarations: [AttdenceHistoryPage]
})
export class AttdenceHistoryPageModule {}
