import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptSubmitPageRoutingModule } from './opt-submit-routing.module';

import { OptSubmitPage } from './opt-submit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptSubmitPageRoutingModule
  ],
  declarations: [OptSubmitPage]
})
export class OptSubmitPageModule {}
