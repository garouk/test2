import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

interface Asistencia {
  fecha: string;  // Fecha de la asistencia
  hora: string;   // Hora exacta de la asistencia (registrada)
  estado: string; // Estado de la asistencia ('Presente', 'Ausente')
}

interface Asignatura {
  asigId: string;
  asigName: string;
  assists: Asistencia[]; // Asistencias para cada asignatura
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  usuario: any; // Variable para almacenar los datos del usuario actual
  asignaturas: Asignatura[] = []; // Array de asignaturas del usuario
  modalAsignatura: Asignatura | null = null; // Asignatura seleccionada para mostrar en el modal

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {
    // Cargar el usuario desde localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Depuración para asegurarse de que el usuario se carga correctamente
    console.log('Usuario cargado:', usuarioGuardado);

    if (usuarioGuardado && usuarioGuardado.asignatura) {
      // Asignar las asignaturas del usuario al array de asignaturas
      this.usuario = usuarioGuardado;
      this.asignaturas = usuarioGuardado.asignatura;
      console.log('Asignaturas cargadas:', this.asignaturas);  // Depuración para verificar las asignaturas
    } else {
      console.log('No se encontraron asignaturas o el usuario no está definido.');
    }
  }

  // Función para abrir el modal con la asignatura seleccionada
  abrirModal(asignatura: Asignatura) {
    this.modalAsignatura = asignatura; // Asignar la asignatura seleccionada al modal
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalAsignatura = null;
  }

  // Función para registrar la asistencia (esto simula el "check-in" de una asignatura)
  registrarAsistencia(asignatura: Asignatura) {
    const fecha = new Date().toLocaleDateString();  // Fecha actual (solo la fecha sin la hora)
    const hora = new Date().toLocaleTimeString();   // Hora actual en formato 24 horas (ej. 14:25:43)

    // Registrar la asistencia con la fecha y la hora
    const nuevaAsistencia: Asistencia = {
      fecha,
      hora,
      estado: 'Presente',  // Esto lo puedes cambiar según el estado que necesites
    };

    // Agregar la nueva asistencia a la asignatura correspondiente
    asignatura.assists.push(nuevaAsistencia);

    // Guardar los datos actualizados del usuario en localStorage
    const usuarioActualizado = { ...this.usuario };
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

    alert(`Asistencia registrada para la asignatura: ${asignatura.asigName}`);
  }

  volver() {
    this.router.navigate(['/inicio']);
  }
}
