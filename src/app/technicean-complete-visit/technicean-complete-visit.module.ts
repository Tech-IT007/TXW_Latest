import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechniceanCompleteVisitPageRoutingModule } from './technicean-complete-visit-routing.module';

import { TechniceanCompleteVisitPage } from './technicean-complete-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechniceanCompleteVisitPageRoutingModule
  ],
  declarations: [TechniceanCompleteVisitPage]
})
export class TechniceanCompleteVisitPageModule {}
