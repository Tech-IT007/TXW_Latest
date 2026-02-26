import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitSparePartPageRoutingModule } from './submit-spare-part-routing.module';

import { SubmitSparePartPage } from './submit-spare-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitSparePartPageRoutingModule
  ],
  declarations: [SubmitSparePartPage]
})
export class SubmitSparePartPageModule {}
