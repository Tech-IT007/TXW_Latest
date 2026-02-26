import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorSummaryPageRoutingModule } from './visitor-summary-routing.module';

import { VisitorSummaryPage } from './visitor-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorSummaryPageRoutingModule
  ],
  declarations: [VisitorSummaryPage]
})
export class VisitorSummaryPageModule {}
