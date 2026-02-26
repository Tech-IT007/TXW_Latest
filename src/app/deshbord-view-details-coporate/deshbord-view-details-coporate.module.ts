import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeshbordViewDetailsCoporatePageRoutingModule } from './deshbord-view-details-coporate-routing.module';

import { DeshbordViewDetailsCoporatePage } from './deshbord-view-details-coporate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeshbordViewDetailsCoporatePageRoutingModule
  ],
  declarations: [DeshbordViewDetailsCoporatePage]
})
export class DeshbordViewDetailsCoporatePageModule {}
