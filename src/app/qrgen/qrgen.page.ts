import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Asignatura {
  asigId: string;
  asigName: string;
}

@Component({
  selector: 'app-qrgen',
  templateUrl: './qrgen.page.html',
  styleUrls: ['./qrgen.page.scss'],
})
export class QrgenPage implements OnInit {

  asignaturas: Asignatura[] = [
    { asigId: '005', asigName: "Arquitectura" },
    { asigId: "004", asigName: "CalidadSof" },
    { asigId: "003", asigName: "Estadistica" },
    { asigId: "006", asigName: "Etica" },
    { asigId: "008", asigName: "Ingles" },
    { asigId: "009", asigName: "Programacion" },
    { asigId: "010", asigName: "Portafolio" },
  ];

  asignaturaSeleccionada: string = '';
  codigoQR: string = '';
  qrData: string = 'https://www.ejemplo.com'; // Puedes asignar un valor por defecto
  usuario: any ={};
  customActionSheetOption = {
    header: 'Selecciona asignatura',
    cssClass: 'custom-action-sheet'
  };

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  generarCodigoQr() {
    if (!this.asignaturaSeleccionada) {
      this.mostrarError('Por favor selecciona una asignatura');
      return;
    }

    // Aquí puedes generar el QR según la asignatura seleccionada
    this.codigoQR = `qr_${this.asignaturaSeleccionada}`;
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async registrarAsistencia() {
    try {
      if (!this.codigoQR) {
        await this.mostrarError('Genera un código QR antes de registrar la asistencia');
        return;
      }

      const nuevaAsistencia = {
        asignatura: this.asignaturaSeleccionada,
        fecha: new Date().toLocaleString('es-Cl', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        estado: 'Presente',
        codigoQR: this.codigoQR
      };

      let asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
      asistencias.push(nuevaAsistencia);
      localStorage.setItem('asistencias', JSON.stringify(asistencias));

      console.log('Asistencia registrada', nuevaAsistencia);
      console.log('Todas las asistencias', asistencias);

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Asistencia registrada correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.codigoQR = '';
            this.asignaturaSeleccionada = '';
            this.router.navigate(['./iniciotwo']);
          }
        }]
      });

      await alert.present();
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
    }
  }

  volver() {
    this.router.navigate(['/iniciotwo']);
  }
}
