import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCareDetailsPageRoutingModule } from './home-care-details-routing.module';

import { HomeCareDetailsPage } from './home-care-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCareDetailsPageRoutingModule
  ],
  declarations: [HomeCareDetailsPage]
})
export class HomeCareDetailsPageModule {}
