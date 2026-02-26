import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoprateAccountDetailsPageRoutingModule } from './coprate-account-details-routing.module';

import { CoprateAccountDetailsPage } from './coprate-account-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoprateAccountDetailsPageRoutingModule
  ],
  declarations: [CoprateAccountDetailsPage]
})
export class CoprateAccountDetailsPageModule {}
