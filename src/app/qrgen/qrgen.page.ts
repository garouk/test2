import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';  

interface Asignatura {
  asigId: string;
  asigName: string;
  assists: any[];  // Lista de asistencias (de tipo "any", ya que se actualiza con datos más específicos)
}

@Component({
  selector: 'app-qrgen',
  templateUrl: './qrgen.page.html',
  styleUrls: ['./qrgen.page.scss'],
})
export class QrgenPage implements OnInit {

  asignaturas: Asignatura[] = [
    { asigId: '005', asigName: "Arquitectura", assists: [] },
    { asigId: "004", asigName: "CalidadSof", assists: [] },
    { asigId: "003", asigName: "Estadistica", assists: [] },
    { asigId: "006", asigName: "Etica", assists: [] },
    { asigId: "008", asigName: "Ingles", assists: [] },
    { asigId: "009", asigName: "Programacion", assists: [] },
    { asigId: "010", asigName: "Portafolio", assists: [] },
  ];

  asignaturaSeleccionada: string = '';
  codigoQR: string = '';
  usuario: any = {};
  customActionSheetOption = {
    header: 'Selecciona asignatura',
    cssClass: 'custom-action-sheet'
  };

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    // Cargar el usuario desde el localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.asignatura) {
      this.asignaturas = currentUser.asignatura; // Cargar las asignaturas completas (con asistencias)
    }
  }

  // Función para generar el código QR
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

  // Función para registrar la asistencia
  async registrarAsistencia() {
    try {
      if (!this.codigoQR) {
        await this.mostrarError('Genera un código QR antes de registrar la asistencia');
        return;
      }

      // Buscar la asignatura seleccionada
      const asignatura = this.asignaturas.find(asig => asig.asigId === this.asignaturaSeleccionada);
      if (!asignatura) {
        await this.mostrarError('Asignatura no encontrada');
        return;
      }

      // Registrar la asistencia
      const nuevaAsistencia = {
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

      // Agregar la nueva asistencia a la asignatura correspondiente
      asignatura.assists.push(nuevaAsistencia);

      // Actualizar la base de datos (db.json) a través del servicio AuthService
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!currentUser || !currentUser.id) {
        await this.mostrarError('No se encontró el usuario');
        return;
      }

      // Llamar al servicio para registrar la asistencia en el backend
      await this.authService.registrarAsistencia(currentUser.id, this.asignaturaSeleccionada, nuevaAsistencia).toPromise();

      // Actualizar el localStorage con las asignaturas y asistencias
      const updatedAsignaturas = currentUser.asignatura.map((asig: any) => {
        if (asig.asigId === asignatura.asigId) {
          return { ...asig, assists: asignatura.assists };
        }
        return asig;
      });

      // Guardar las asignaturas actualizadas en localStorage
      currentUser.asignatura = updatedAsignaturas;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      console.log('Asistencia registrada', nuevaAsistencia);
      console.log('Todas las asistencias', asignatura.assists);

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Asistencia registrada correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.codigoQR = '';  // Limpiar el código QR
            this.asignaturaSeleccionada = '';  // Limpiar la asignatura seleccionada
            this.router.navigate(['./inicio']);
          }
        }]
      });

      await alert.present();
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      await this.mostrarError('Hubo un error al registrar la asistencia');
    }
  }

  volver() {
    this.router.navigate(['/inicio']);
  }
}
