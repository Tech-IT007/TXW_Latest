import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireCheckListPageRoutingModule } from './fire-check-list-routing.module';

import { FireCheckListPage } from './fire-check-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireCheckListPageRoutingModule
  ],
  declarations: [FireCheckListPage]
})
export class FireCheckListPageModule {}
