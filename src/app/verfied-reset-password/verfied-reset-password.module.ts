import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerfiedResetPasswordPageRoutingModule } from './verfied-reset-password-routing.module';

import { VerfiedResetPasswordPage } from './verfied-reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerfiedResetPasswordPageRoutingModule
  ],
  declarations: [VerfiedResetPasswordPage]
})
export class VerfiedResetPasswordPageModule {}
