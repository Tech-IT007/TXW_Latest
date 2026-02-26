import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RocketPageRoutingModule } from './rocket-routing.module';

import { RocketPage } from './rocket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RocketPageRoutingModule
  ],
  declarations: [RocketPage]
})
export class RocketPageModule {}
