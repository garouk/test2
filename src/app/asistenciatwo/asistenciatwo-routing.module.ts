import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciatwoPage } from './asistenciatwo.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciatwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciatwoPageRoutingModule {}
