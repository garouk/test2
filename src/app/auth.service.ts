import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // URL del servidor json-server

  constructor(private http: HttpClient, private router: Router) {}

  login(name: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(  // Obtener todos los usuarios desde db.json
      map(usuarios => {
        const usuario = usuarios.find(u => u.name === name && u.password === password);
        if (usuario) {
          // Si se encuentra al usuario, devolver los datos
          return usuario;
        } else {
          // Si no se encuentra, lanzar un error
          throw new Error('Usuario o contraseña incorrectos');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('userType');  // Limpiar cualquier dato del usuario en localStorage
    this.router.navigate(['/sesion']);
  }

  // Obtener el tipo de usuario almacenado en localStorage
  getUserType(): string {
    return localStorage.getItem('userType') || '';  // Si no hay usuario, retornar cadena vacía
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }
}
