import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovelTestingPageRoutingModule } from './approvel-testing-routing.module';

import { ApprovelTestingPage } from './approvel-testing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovelTestingPageRoutingModule
  ],
  declarations: [ApprovelTestingPage]
})
export class ApprovelTestingPageModule {}
