import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeshbordViewDetailsPageRoutingModule } from './deshbord-view-details-routing.module';

import { DeshbordViewDetailsPage } from './deshbord-view-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeshbordViewDetailsPageRoutingModule
  ],
  declarations: [DeshbordViewDetailsPage]
})
export class DeshbordViewDetailsPageModule {}
