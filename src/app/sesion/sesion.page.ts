import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Importar el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage {
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.name, this.password).subscribe(
      usuario => {
        // Si el login es exitoso, guardar el tipo de usuario en localStorage
        localStorage.setItem('userName', usuario.name)
        localStorage.setItem('userType', usuario.tipo);  // Guardamos el tipo de usuario en localStorage

        if (usuario.tipo === 'profesor') {
          this.router.navigate(['iniciotwo']);  // Redirigir a la vista de profesor
        } else if (usuario.tipo === 'estudiante') {
          this.router.navigate(['/inicio']);  // Redirigir a la vista de estudiante
        }
      },
      error => {
        this.errorMessage = 'Usuario o contraseña incorrectos';  // Mostrar mensaje de error si no es encontrado
      }
    );
  }
}
