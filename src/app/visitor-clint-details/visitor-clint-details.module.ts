import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorClintDetailsPageRoutingModule } from './visitor-clint-details-routing.module';

import { VisitorClintDetailsPage } from './visitor-clint-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorClintDetailsPageRoutingModule
  ],
  declarations: [VisitorClintDetailsPage]
})
export class VisitorClintDetailsPageModule {}
