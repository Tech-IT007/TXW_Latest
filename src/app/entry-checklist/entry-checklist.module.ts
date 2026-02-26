import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryChecklistPageRoutingModule } from './entry-checklist-routing.module';

import { EntryChecklistPage } from './entry-checklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryChecklistPageRoutingModule
  ],
  declarations: [EntryChecklistPage]
})
export class EntryChecklistPageModule {}
