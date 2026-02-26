import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DpList2PageRoutingModule } from './dp-list2-routing.module';

import { DpList2Page } from './dp-list2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DpList2PageRoutingModule
  ],
  declarations: [DpList2Page]
})
export class DpList2PageModule {}
