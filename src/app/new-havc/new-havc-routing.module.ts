import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewHavcPage } from './new-havc.page';

const routes: Routes = [
  {
    path: '',
    component: NewHavcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewHavcPageRoutingModule {}
