import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

formularioLogin: FormGroup;

constructor(public fb: FormBuilder, public alertController: AlertController, private router:Router) { 
    this.formularioLogin = this.fb.group({
      user: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

  }

async login() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario inválido',
        message: 'Por favor, complete todos los campos requeridos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const f = this.formularioLogin.value;
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.user === f.user && user.password === f.password) {
      const alert = await this.alertController.create({
        header: 'Inicio exitoso',
        message: `Ha iniciado sesion correctamente.\n\nBienvenido, ${user.user}.`,
        buttons: ['Aceptar']
      });
      console.log('Ingresado');
      this.router.navigate(['/inicio'])
      await alert.present();
      return;

    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}