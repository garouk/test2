import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor(private router:Router,private modalController: ModalController) { }

  ngOnInit() {
  }
  volver(){
    this.modalController.dismiss;
    this.router.navigate(['/inicio'])
  }
}
