import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountApprovelDetailsByIdPageRoutingModule } from './account-approvel-details-by-id-routing.module';

import { AccountApprovelDetailsByIdPage } from './account-approvel-details-by-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountApprovelDetailsByIdPageRoutingModule
  ],
  declarations: [AccountApprovelDetailsByIdPage]
})
export class AccountApprovelDetailsByIdPageModule {}
