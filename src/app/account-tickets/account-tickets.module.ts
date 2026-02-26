import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccountTicketsPageRoutingModule } from './account-tickets-routing.module';

import { AccountTicketsPage } from './account-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AccountTicketsPageRoutingModule
  ],
  declarations: [AccountTicketsPage]
})
export class AccountTicketsPageModule {}
