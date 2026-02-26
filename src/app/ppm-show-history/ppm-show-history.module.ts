import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmShowHistoryPageRoutingModule } from './ppm-show-history-routing.module';

import { PpmShowHistoryPage } from './ppm-show-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpmShowHistoryPageRoutingModule
  ],
  declarations: [PpmShowHistoryPage]
})
export class PpmShowHistoryPageModule {}
