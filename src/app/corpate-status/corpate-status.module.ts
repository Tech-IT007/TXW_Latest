import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorpateStatusPageRoutingModule } from './corpate-status-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CorpateStatusPage } from './corpate-status.page';
import { IonSelectSearchLibModule } from 'ionic-select-search';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    FormsModule,
    IonicModule,
    CorpateStatusPageRoutingModule,
    IonSelectSearchLibModule ,
    Ng2SearchPipeModule
  ],
  declarations: [CorpateStatusPage]
})
export class CorpateStatusPageModule {}
