import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskDetailsPageRoutingModule } from './help-desk-details-routing.module';

import { HelpDeskDetailsPage } from './help-desk-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskDetailsPageRoutingModule
  ],
  declarations: [HelpDeskDetailsPage]
})
export class HelpDeskDetailsPageModule {}
