import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountApprovelStatusPageRoutingModule } from './account-approvel-status-routing.module';

import { AccountApprovelStatusPage } from './account-approvel-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountApprovelStatusPageRoutingModule
  ],
  declarations: [AccountApprovelStatusPage]
})
export class AccountApprovelStatusPageModule {}
