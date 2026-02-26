import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesboardViewHomecarePageRoutingModule } from './desboard-view-homecare-routing.module';

import { DesboardViewHomecarePage } from './desboard-view-homecare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesboardViewHomecarePageRoutingModule
  ],
  declarations: [DesboardViewHomecarePage]
})
export class DesboardViewHomecarePageModule {}
