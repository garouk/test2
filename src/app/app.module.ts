import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { ModalContentPageModule } from './modal-content/modal-content.module';  // Correcto
import { AsistenciaPageModule } from './asistencia/asistencia.module';  // Correcto

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    ModalContentPageModule,  // Asegúrate de que se importe el módulo
    AsistenciaPageModule,    // Asegúrate de que se importe el módulo
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
