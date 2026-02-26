import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PanelChecklistPageRoutingModule } from './panel-checklist-routing.module';
import { PanelChecklistPage } from './panel-checklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PanelChecklistPageRoutingModule
  ],
  declarations: [PanelChecklistPage]
})
export class PanelChecklistPageModule {}