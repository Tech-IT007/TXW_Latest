import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardModalPageRoutingModule } from './dashboard-modal-routing.module';

import { DashboardModalPage } from './dashboard-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardModalPageRoutingModule
  ],
  declarations: [DashboardModalPage]
})
export class DashboardModalPageModule {}
