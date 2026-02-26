import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountViewDetailsPageRoutingModule } from './account-view-details-routing.module';

import { AccountViewDetailsPage } from './account-view-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountViewDetailsPageRoutingModule
  ],
  declarations: [AccountViewDetailsPage]
})
export class AccountViewDetailsPageModule {}
