import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymetShowPageRoutingModule } from './paymet-show-routing.module';

import { PaymetShowPage } from './paymet-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymetShowPageRoutingModule
  ],
  declarations: [PaymetShowPage]
})
export class PaymetShowPageModule {}
