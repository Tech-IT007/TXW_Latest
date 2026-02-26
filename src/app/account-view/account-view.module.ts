import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountViewPageRoutingModule } from './account-view-routing.module';

import { AccountViewPage } from './account-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountViewPageRoutingModule
  ],
  declarations: [AccountViewPage]
})
export class AccountViewPageModule {}
