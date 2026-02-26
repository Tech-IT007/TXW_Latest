import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttdenceProfilePage } from './attdence-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AttdenceProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttdenceProfilePageRoutingModule {}
