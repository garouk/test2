import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciotwoPage } from './iniciotwo.page';

const routes: Routes = [
  {
    path: '',
    component: IniciotwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciotwoPageRoutingModule {}
