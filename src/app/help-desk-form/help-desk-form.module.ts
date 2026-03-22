import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskFormPageRoutingModule } from './help-desk-form-routing.module';

import { HelpDeskFormPage } from './help-desk-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskFormPageRoutingModule
  ],
  declarations: [HelpDeskFormPage]
})
export class HelpDeskFormPageModule {}
