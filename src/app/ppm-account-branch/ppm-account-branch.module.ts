import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpmAccountBranchPageRoutingModule } from './ppm-account-branch-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PpmAccountBranchPage } from './ppm-account-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule ,
    PpmAccountBranchPageRoutingModule
  ],
  declarations: [PpmAccountBranchPage]
})
export class PpmAccountBranchPageModule {}
