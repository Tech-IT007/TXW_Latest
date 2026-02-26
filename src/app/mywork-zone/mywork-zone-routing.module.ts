import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyworkZonePage } from './mywork-zone.page';

const routes: Routes = [
  {
    path: '',
    component: MyworkZonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyworkZonePageRoutingModule {}
