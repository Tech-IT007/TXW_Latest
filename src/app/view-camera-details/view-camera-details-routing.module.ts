import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCameraDetailsPage } from './view-camera-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCameraDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCameraDetailsPageRoutingModule {}
