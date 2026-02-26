import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssigPagePageRoutingModule } from './assig-page-routing.module';
import { IonSelectSearchLibModule } from 'ionic-select-search';
import { AssigPagePage } from './assig-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonSelectSearchLibModule,
    IonicModule,
    AssigPagePageRoutingModule
  ],
  declarations: [AssigPagePage]
})
export class AssigPagePageModule {}
