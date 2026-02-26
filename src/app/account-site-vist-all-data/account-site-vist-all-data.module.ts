import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSiteVistAllDataPageRoutingModule } from './account-site-vist-all-data-routing.module';

import { AccountSiteVistAllDataPage } from './account-site-vist-all-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSiteVistAllDataPageRoutingModule
  ],
  declarations: [AccountSiteVistAllDataPage]
})
export class AccountSiteVistAllDataPageModule {}
