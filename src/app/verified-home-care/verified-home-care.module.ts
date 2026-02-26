import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifiedHomeCarePageRoutingModule } from './verified-home-care-routing.module';

import { VerifiedHomeCarePage } from './verified-home-care.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    VerifiedHomeCarePageRoutingModule
  ],
  declarations: [VerifiedHomeCarePage]
})
export class VerifiedHomeCarePageModule {}
