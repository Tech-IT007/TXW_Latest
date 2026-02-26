import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVerfiedOptPageRoutingModule } from './home-verfied-opt-routing.module';

import { HomeVerfiedOptPage } from './home-verfied-opt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVerfiedOptPageRoutingModule
  ],
  declarations: [HomeVerfiedOptPage]
})
export class HomeVerfiedOptPageModule {}
