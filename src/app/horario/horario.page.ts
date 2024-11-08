import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }
  
  volver(){
    this.modalController.dismiss();
    this.router.navigate(['/inicio']);
  }
}
