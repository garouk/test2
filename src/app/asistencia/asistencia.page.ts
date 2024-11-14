import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalContentPage } from '../modal-content/modal-content.page';  // Asegúrate de importar el modal

interface Asistencia {
  fecha: string;
  hora: string;
  estado: string;
  codigoQR: string;
}

export interface Asignatura {
  asigId: string;
  asigName: string;
  assists: Asistencia[];
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asignaturas: Asignatura[] = [];

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (currentUser && currentUser.asignatura) {
      this.asignaturas = currentUser.asignatura;
    } else {
      this.asignaturas = [];
    }
  }

  // Abre el modal con la asignatura seleccionada
  async abrirModal(asignatura: Asignatura) {
    console.log('Asignatura seleccionada:', asignatura);  // Verifica que la asignatura se pasa correctamente

    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        Asignatura: asignatura  // Pasamos la asignatura al modal con la propiedad 'Asignatura'
      }
    });

    await modal.present();
  }

  // Método para registrar asistencia a una asignatura
  registrarAsistencia(asignatura: Asignatura) {
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();

  const nuevaAsistencia: Asistencia = {
    fecha,
    hora,
    estado: 'Presente',
    codigoQR: `qr_${Math.floor(Math.random() * 1000)}`,  // Genera un código QR único
  };

  // Agregar la nueva asistencia a la asignatura seleccionada
  asignatura.assists.push(nuevaAsistencia);

  // Verifica si 'currentUser' existe y si tiene asignaturas
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (currentUser && currentUser.asignatura) {
    // Si existe, actualizamos las asignaturas en el localStorage
    const updatedAsignaturas = currentUser.asignatura.map((asig: any) => {
      if (asig.asigId === asignatura.asigId) {
        // Actualizar la asignatura correspondiente
        return { ...asig, assists: asignatura.assists };
      }
      return asig;
    });

    // Guardar las asignaturas actualizadas
    currentUser.asignatura = updatedAsignaturas;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert(`Asistencia registrada para: ${asignatura.asigName}`);
  } else {
    // Si no existe 'currentUser' o 'asignatura', mostrar un error
    console.error('No se encontraron asignaturas en el usuario actual');
    alert('Error al registrar la asistencia. Intenta nuevamente.');
  }
}

  // Método para navegar de vuelta
  volver() {
    this.router.navigate(['/inicio']);
  }
}
