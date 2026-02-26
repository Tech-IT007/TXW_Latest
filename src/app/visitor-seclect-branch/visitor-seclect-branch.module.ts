import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorSeclectBranchPageRoutingModule } from './visitor-seclect-branch-routing.module';

import { IonSelectSearchLibModule } from 'ionic-select-search';
import { VisitorSeclectBranchPage } from './visitor-seclect-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonSelectSearchLibModule,
    IonicModule,
    VisitorSeclectBranchPageRoutingModule
  ],
  declarations: [VisitorSeclectBranchPage]
})
export class VisitorSeclectBranchPageModule {}
