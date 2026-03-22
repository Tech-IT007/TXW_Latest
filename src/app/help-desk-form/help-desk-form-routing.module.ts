import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpDeskFormPage } from './help-desk-form.page';

const routes: Routes = [
  {
    path: '',
    component: HelpDeskFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskFormPageRoutingModule {}
