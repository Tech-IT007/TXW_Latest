import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesboardViewCorporatePageRoutingModule } from './desboard-view-corporate-routing.module';

import { DesboardViewCorporatePage } from './desboard-view-corporate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesboardViewCorporatePageRoutingModule
  ],
  declarations: [DesboardViewCorporatePage]
})
export class DesboardViewCorporatePageModule {}
