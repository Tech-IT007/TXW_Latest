import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountBranchTicketsPageRoutingModule } from './account-branch-tickets-routing.module';

import { AccountBranchTicketsPage } from './account-branch-tickets.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AccountBranchTicketsPageRoutingModule
  ],
  declarations: [AccountBranchTicketsPage]
})
export class AccountBranchTicketsPageModule {}
