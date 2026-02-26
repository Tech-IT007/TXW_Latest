import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprIdListPageRoutingModule } from './dpr-id-list-routing.module';

import { DprIdListPage } from './dpr-id-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DprIdListPageRoutingModule
  ],
  declarations: [DprIdListPage]
})
export class DprIdListPageModule {}
