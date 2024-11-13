import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrgenPageRoutingModule } from './qrgen-routing.module';
import { QrgenPage } from './qrgen.page';

// Importa el QRCodeModule para usar el componente <qrcode>
import { QRCodeModule } from 'angularx-qrcode';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgenPageRoutingModule,
    QRCodeModule  // Agrega QRCodeModule aquí
  ],
  declarations: [QrgenPage]
})
export class QrgenPageModule {}
