import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttdencOUTPageRoutingModule } from './attdenc-out-routing.module';

import { AttdencOUTPage } from './attdenc-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttdencOUTPageRoutingModule
  ],
  declarations: [AttdencOUTPage]
})
export class AttdencOUTPageModule {}
