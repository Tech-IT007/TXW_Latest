import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveManagmentPageRoutingModule } from './leave-managment-routing.module';

import { LeaveManagmentPage } from './leave-managment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveManagmentPageRoutingModule
  ],
  declarations: [LeaveManagmentPage]
})
export class LeaveManagmentPageModule {}
