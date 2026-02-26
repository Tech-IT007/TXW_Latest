import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditDataPage } from './audit-data.page';

const routes: Routes = [
  {
    path: '',
    component: AuditDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditDataPageRoutingModule {}
