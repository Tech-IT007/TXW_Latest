import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountVistFormPageRoutingModule } from './account-vist-form-routing.module';

import { AccountVistFormPage } from './account-vist-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountVistFormPageRoutingModule
  ],
  declarations: [AccountVistFormPage]
})
export class AccountVistFormPageModule {}
