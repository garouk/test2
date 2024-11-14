// modal-content.page.ts (Modal)
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.page.html',
  styleUrls: ['./modal-content.page.scss'],
})
export class ModalContentPage implements OnInit {

  Asignatura: any;  // Recibimos la asignatura con las asistencias

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Asignatura recibida en el modal:', this.Asignatura);  // Verifica que la asignatura está correctamente recibida

    // Si no recibimos la asignatura, mostramos un mensaje
    if (!this.Asignatura) {
      console.log('No se recibió la asignatura correctamente');
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
