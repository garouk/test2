import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciatwoPageRoutingModule } from './asistenciatwo-routing.module';

import { AsistenciatwoPage } from './asistenciatwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciatwoPageRoutingModule
  ],
  declarations: [AsistenciatwoPage]
})
export class AsistenciatwoPageModule {}
