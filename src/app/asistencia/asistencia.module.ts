import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaPage } from './asistencia.page';
import { IonicModule } from '@ionic/angular';
import { AsistenciaPageRoutingModule } from './asistencia-routing.module';

@NgModule({
  declarations: [AsistenciaPage],  // Declarar la página AsistenciaPage
  imports: [
    CommonModule,
    IonicModule,
    AsistenciaPageRoutingModule  // Importar el módulo de routing si lo tienes
  ],
  exports: [AsistenciaPage]  // Exportar AsistenciaPage para que se pueda usar en otros módulos
})
export class AsistenciaPageModule {}
