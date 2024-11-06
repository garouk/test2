import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciotwoPageRoutingModule } from './iniciotwo-routing.module';

import { IniciotwoPage } from './iniciotwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciotwoPageRoutingModule
  ],
  declarations: [IniciotwoPage]
})
export class IniciotwoPageModule {}
