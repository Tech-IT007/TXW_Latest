import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovelTestingPage } from './approvel-testing.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovelTestingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovelTestingPageRoutingModule {}
