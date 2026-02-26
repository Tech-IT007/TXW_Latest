import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPpmTickestPageRoutingModule } from './all-ppm-tickest-routing.module';

import { AllPpmTickestPage } from './all-ppm-tickest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPpmTickestPageRoutingModule
  ],
  declarations: [AllPpmTickestPage]
})
export class AllPpmTickestPageModule {}
