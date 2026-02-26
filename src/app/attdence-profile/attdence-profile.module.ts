import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttdenceProfilePageRoutingModule } from './attdence-profile-routing.module';

import { AttdenceProfilePage } from './attdence-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttdenceProfilePageRoutingModule
  ],
  declarations: [AttdenceProfilePage]
})
export class AttdenceProfilePageModule {}
