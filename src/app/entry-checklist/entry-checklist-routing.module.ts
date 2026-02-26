import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryChecklistPage } from './entry-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: EntryChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryChecklistPageRoutingModule {}
