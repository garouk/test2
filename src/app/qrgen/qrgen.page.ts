import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

interface Asignatura {
  asigId: string;
  asigName: string;
  assists: any[];
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
  asignaturaNombre: string = '';  
  codigoQR: string = '';         

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
   
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.asignatura) {
      this.asignaturas = currentUser.asignatura;
    }
  }

 
  generarCodigoQr() {
    if (!this.asignaturaSeleccionada) {
      this.mostrarError('Por favor selecciona una asignatura');
      return;
    }
  
   
    const asignatura = this.asignaturas.find(asig => asig.asigId === this.asignaturaSeleccionada);
    if (asignatura) {
      this.asignaturaNombre = asignatura.asigName;  
      this.codigoQR = `qr_${asignatura.asigId}_${asignatura.asigName}`;  
    }
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

      
      const asignatura = this.asignaturas.find(asig => asig.asigId === this.asignaturaSeleccionada);
      if (!asignatura) {
        await this.mostrarError('Asignatura no encontrada');
        return;
      }

      
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

      
      asignatura.assists.push(nuevaAsistencia);

     
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!currentUser || !currentUser.id) {
        await this.mostrarError('No se encontró el usuario');
        return;
      }

      
      await this.authService.registrarAsistencia(currentUser.id, this.asignaturaSeleccionada, nuevaAsistencia).toPromise();

      
      const updatedAsignaturas = currentUser.asignatura.map((asig: any) => {
        if (asig.asigId === asignatura.asigId) {
          return { ...asig, assists: asignatura.assists };
        }
        return asig;
      });

      
      currentUser.asignatura = updatedAsignaturas;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      
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
      await this.mostrarError('Hubo un error al registrar la asistencia');
    }
  }

  volver() {
    this.router.navigate(['/iniciotwo']);  
  }
}
