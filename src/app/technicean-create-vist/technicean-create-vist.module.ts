import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechniceanCreateVistPageRoutingModule } from './technicean-create-vist-routing.module';

import { TechniceanCreateVistPage } from './technicean-create-vist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechniceanCreateVistPageRoutingModule
  ],
  declarations: [TechniceanCreateVistPage]
})
export class TechniceanCreateVistPageModule {}
