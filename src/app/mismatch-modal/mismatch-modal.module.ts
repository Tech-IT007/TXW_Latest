import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MismatchModalPageRoutingModule } from './mismatch-modal-routing.module';

import { MismatchModalPage } from './mismatch-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MismatchModalPageRoutingModule
  ],
  declarations: [MismatchModalPage]
})
export class MismatchModalPageModule {}
