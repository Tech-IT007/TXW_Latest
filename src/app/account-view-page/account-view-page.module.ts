import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountViewPagePageRoutingModule } from './account-view-page-routing.module';

import { AccountViewPagePage } from './account-view-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountViewPagePageRoutingModule
  ],
  declarations: [AccountViewPagePage]
})
export class AccountViewPagePageModule {}
