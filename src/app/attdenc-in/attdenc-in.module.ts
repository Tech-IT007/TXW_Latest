import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttdencINPageRoutingModule } from './attdenc-in-routing.module';

import { AttdencINPage } from './attdenc-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttdencINPageRoutingModule
  ],
  declarations: [AttdencINPage]
})
export class AttdencINPageModule {}
