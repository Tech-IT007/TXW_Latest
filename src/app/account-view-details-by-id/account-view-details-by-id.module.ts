import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountViewDetailsByIdPageRoutingModule } from './account-view-details-by-id-routing.module';

import { AccountViewDetailsByIdPage } from './account-view-details-by-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountViewDetailsByIdPageRoutingModule
  ],
  declarations: [AccountViewDetailsByIdPage]
})
export class AccountViewDetailsByIdPageModule {}
