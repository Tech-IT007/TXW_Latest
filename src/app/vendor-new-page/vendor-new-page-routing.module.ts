import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorNewPagePage } from './vendor-new-page.page';

const routes: Routes = [
  {
    path: '',
    component: VendorNewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorNewPagePageRoutingModule {}
