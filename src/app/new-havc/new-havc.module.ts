import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewHavcPageRoutingModule } from './new-havc-routing.module';

import { NewHavcPage } from './new-havc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewHavcPageRoutingModule
  ],
  declarations: [NewHavcPage]
})
export class NewHavcPageModule {}
