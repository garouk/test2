import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  segment: string = 'qr'; // Mostrar la sección de QR
  qrText: string = 'qr_arquitectura'; // Aquí puedes elegir el valor por defecto para el QR
  usuario: any = {}; // Información del usuario desde localStorage
  asignaturas: any[] = []; // Array de asignaturas
  scannedCode: string | null = null; // Para guardar el código QR escaneado
  asistenciaRegistrada: boolean = false; // Agregar esta propiedad
  modalController: any;

  constructor(private platform: Platform, private router: Router) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      if (this.usuario && this.usuario.asignaturas) {
        this.asignaturas = this.usuario.asignaturas; // Cargar las asignaturas del usuario
      }
      this.startScan(); // Iniciar escaneo al cargar la página
    });
  }

  // Cambiar el código QR dependiendo de la asignatura seleccionada
  seleccionarAsignatura(asignatura: any) {
    this.qrText = `qr_${asignatura.asigId}`; // Generar QR con asigId
  }

  // Función para iniciar el escaneo de QR
  startScan() {
    const scanner = new Html5QrcodeScanner("qrScanner", {
      fps: 10,
      qrbox: 250
    }, false);

    scanner.render(
      (decodedText) => {
        this.scannedCode = decodedText;
        console.log("Código QR escaneado: ", decodedText); // Aquí se puede manejar el texto del QR
        scanner.clear(); // Limpiar el escáner, ya que el escaneo se ha completado

        // Aquí puedes actualizar la variable `asistenciaRegistrada` cuando se haya escaneado un QR válido
        this.registrarAsistencia(decodedText);
      },
      (errorMessage) => {
        console.log("Error al escanear: ", errorMessage); // Manejamos errores de escaneo
      }
    );
  }

  volver() {
    this.router.navigate(['/inicio']);
  }

  // Registrar la asistencia en la asignatura seleccionada
  registrarAsistencia(qrData: string) {
    if (this.usuario) {
      // Buscar la asignatura con el id correspondiente al QR escaneado
      const asignatura = this.asignaturas.find(a => `qr_${a.asigId}` === qrData);

      if (asignatura) {
        // Registrar la asistencia (puedes agregar la fecha o el usuario si es necesario)
        const fecha = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
        asignatura.assists.push({ fecha, usuarioId: this.usuario.id });

        // Actualizar el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(this.usuario));

        alert(`Asistencia registrada para la asignatura: ${asignatura.asigName}`);
        this.asistenciaRegistrada = true;
      } else {
        alert('No se encontró la asignatura correspondiente al QR.');
      }
    } else {
      alert('No se encontró el usuario en el sistema.');
    }
  }
}
