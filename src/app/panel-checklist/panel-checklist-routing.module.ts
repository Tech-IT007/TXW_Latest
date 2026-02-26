import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelChecklistPage } from './panel-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: PanelChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelChecklistPageRoutingModule {}