import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCameraDetailsPageRoutingModule } from './view-camera-details-routing.module';

import { ViewCameraDetailsPage } from './view-camera-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCameraDetailsPageRoutingModule
  ],
  declarations: [ViewCameraDetailsPage]
})
export class ViewCameraDetailsPageModule {}
