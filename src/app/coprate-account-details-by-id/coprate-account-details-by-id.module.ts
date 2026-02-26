import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoprateAccountDetailsByIdPageRoutingModule } from './coprate-account-details-by-id-routing.module';

import { CoprateAccountDetailsByIdPage } from './coprate-account-details-by-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoprateAccountDetailsByIdPageRoutingModule
  ],
  declarations: [CoprateAccountDetailsByIdPage]
})
export class CoprateAccountDetailsByIdPageModule {}
