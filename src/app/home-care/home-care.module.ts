import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCarePageRoutingModule } from './home-care-routing.module';

import { HomeCarePage } from './home-care.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCarePageRoutingModule
  ],
  declarations: [HomeCarePage]
})
export class HomeCarePageModule {}
