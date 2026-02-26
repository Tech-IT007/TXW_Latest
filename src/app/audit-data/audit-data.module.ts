import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditDataPageRoutingModule } from './audit-data-routing.module';

import { AuditDataPage } from './audit-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditDataPageRoutingModule
  ],
  declarations: [AuditDataPage]
})
export class AuditDataPageModule {}
