import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit, AfterViewInit {
  segment: string = 'qr'; // Mostrar la sección de QR
  qrText: string = ''; // Texto por defecto para QR (vacío inicialmente)
  usuario: any = {}; // Información del usuario desde localStorage
  asignaturas: any[] = []; // Array de asignaturas
  scannedCode: string | null = null; // Para guardar el código QR escaneado
  asistenciaRegistrada: boolean = false; // Estado de asistencia
  asignaturaSeleccionada: string = ''; // Asignatura seleccionada para verificar el QR
  botonDesbloqueado: boolean = false; // Estado del botón para registrar asistencia

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService  // Inyectamos AuthService
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      // Cargar el usuario desde localStorage
      this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (this.usuario && this.usuario.id) {
        // Verificar si 'asignaturas' existe y tiene datos
        if (this.usuario.asignatura && Array.isArray(this.usuario.asignatura) && this.usuario.asignatura.length > 0) {
          this.asignaturas = this.usuario.asignatura;  // Asignar las asignaturas desde el usuario
        } else {
          console.error('El usuario no tiene asignaturas asignadas o asignaturas es un arreglo vacío.');
        }
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    });
  }

  ngAfterViewInit() {
    // Inicializar el escáner después de que la vista se haya cargado
    if (this.asignaturaSeleccionada) {
      this.startScan();
    }
  }

  // Función para seleccionar asignatura antes de escanear
  seleccionarAsignaturaParaEscaneo() {
    if (this.asignaturaSeleccionada) {
      // Obtener el nombre de la asignatura seleccionada
      const asignaturaSeleccionada = this.asignaturas.find(a => a.asigId === this.asignaturaSeleccionada);
      if (asignaturaSeleccionada) {
        this.qrText = `qr_${this.asignaturaSeleccionada}_${asignaturaSeleccionada.asigName}`; // Generamos el QR para esta asignatura
        console.log('QR generado:', this.qrText); // Verificar que el QR se está generando correctamente
      }
      // Iniciar el escaneo después de seleccionar la asignatura
      this.startScan();
    } else {
      alert('Por favor, selecciona una asignatura antes de escanear.');
    }
  }

  // Función para iniciar el escaneo de QR
  startScan() {
    const scannerElement = document.getElementById('qrScanner');
    if (scannerElement) {
      const scanner = new Html5QrcodeScanner('qrScanner', {
        fps: 10,
        qrbox: 250,
      }, false);

      scanner.render(
        (decodedText) => {
          this.scannedCode = decodedText;
          console.log('Código QR escaneado: ', decodedText);

          // Validar si el QR escaneado corresponde a la asignatura seleccionada
          if (this.validarCodigoQR(decodedText)) {
            this.botonDesbloqueado = true;  // Habilitar el botón de registro de asistencia
          } else {
            alert('El QR no corresponde a la asignatura seleccionada.');
            this.botonDesbloqueado = false;  // Deshabilitar el botón si el QR no es válido
          }
        },
        (errorMessage) => {
          console.log('Error al escanear: ', errorMessage);
        }
      );
    } else {
      console.error('Contenedor del escáner QR no encontrado.');
    }
  }

  // Validar si el QR escaneado corresponde a la asignatura seleccionada
  validarCodigoQR(qrData: string): boolean {
    // Extraemos el ID y el nombre de la asignatura del QR
    const [qrAsignaturaId, qrAsignaturaName] = qrData.replace('qr_', '').split('_');
    console.log(`Validando QR: ${qrAsignaturaId} === ${this.asignaturaSeleccionada}`);

    // Verificamos si el ID y nombre del QR coinciden con la asignatura seleccionada
    const asignaturaSeleccionada = this.asignaturas.find(a => a.asigId === this.asignaturaSeleccionada);
    return asignaturaSeleccionada && qrAsignaturaId === this.asignaturaSeleccionada && qrAsignaturaName === asignaturaSeleccionada.asigName;
  }

  volver() {
    this.router.navigate(['/inicio']);
  }

  // Función para registrar la asistencia
  registrarAsistencia() {
    if (this.botonDesbloqueado) {
      const asignatura = this.asignaturas.find(a => a.asigId === this.asignaturaSeleccionada);
      if (asignatura) {
        const fecha = new Date().toLocaleString(); // Usamos el formato de fecha estándar de la zona local
        const asistencia = {
          fecha: fecha,   // Usamos el formato completo de fecha (DD/MM/YYYY, HH:mm a)
          estado: 'Presente',  // Asumimos que el estado siempre es "Presente" al registrar
          codigoQR: `qr_${this.asignaturaSeleccionada}` // Usamos el mismo formato del QR escaneado
        };

        // Llamamos al servicio para registrar la asistencia en la base de datos
        this.authService.registrarAsistencia(this.usuario.id, this.asignaturaSeleccionada, asistencia).subscribe(
          (res) => {
            alert(`Asistencia registrada para la asignatura: ${asignatura.asigName}`);
            this.asistenciaRegistrada = true;
            this.botonDesbloqueado = false;  // Desbloquear el botón después de registrar la asistencia
          },
          (error) => {
            console.error('Error al registrar la asistencia', error);
            alert('Hubo un error al registrar la asistencia');
          }
        );
      }
    } else {
      alert('Por favor, escanea el código QR correcto antes de registrar la asistencia.');
    }
  }
}