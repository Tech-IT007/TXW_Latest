import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSiteVistPageRoutingModule } from './account-site-vist-routing.module';

import { AccountSiteVistPage } from './account-site-vist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSiteVistPageRoutingModule
  ],
  declarations: [AccountSiteVistPage]
})
export class AccountSiteVistPageModule {}
