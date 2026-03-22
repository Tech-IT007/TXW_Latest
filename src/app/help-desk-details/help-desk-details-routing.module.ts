import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpDeskDetailsPage } from './help-desk-details.page';

const routes: Routes = [
  {
    path: '',
    component: HelpDeskDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskDetailsPageRoutingModule {}
