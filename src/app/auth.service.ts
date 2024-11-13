import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // URL del servidor json-server

  constructor(private http: HttpClient, private router: Router,  private alertCtrl: AlertController) {}

  login(name: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(  // Obtener todos los usuarios desde db.json
      map(usuarios => {
        const usuario = usuarios.find(u => u.name === name && u.password === password);
        if (usuario) {
          // Si se encuentra al usuario, guardar sus datos en localStorage
          localStorage.setItem('currentUser', JSON.stringify(usuario));  // Guardar el usuario completo
          return usuario;
        } else {
          // Si no se encuentra, lanzar un error
          throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError((error) => {
        throw new Error(error.message);  // Propagar el error de manera adecuada
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


  async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    try {
      // Obtener el usuario completo de localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
      if (!currentUser || !currentUser.id) {
        throw new Error('No se encontró información del usuario');
      }
  
      // Verificar que la contraseña actual sea correcta
      if (currentUser.password !== oldPassword) {
        throw new Error('La contraseña actual no es correcta');
      }
  
      // Verificar que la nueva contraseña coincida con la confirmación
      if (newPassword !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
  
      // Actualizar la contraseña
      currentUser.password = newPassword;
  
      // Hacer la solicitud PUT para actualizar la contraseña del usuario en el backend
      await this.http.put(`${this.apiUrl}/${currentUser.id}`, currentUser).toPromise();
  
      // Mostrar un mensaje de éxito
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Contraseña cambiada correctamente',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Mostrar un mensaje de error si algo falla
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un error al cambiar la contraseña',
        buttons: ['OK']
      });
      await alert.present();
    }
    
  }
  registrarAsistencia(userId: string, asigId: string, asistencia: any): Observable<any> {
    // Primero obtenemos el usuario
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      switchMap((user) => {
        // Encontramos la asignatura correspondiente
        const asignatura = user.asignatura.find((asig: { asigId: string; }) => asig.asigId === asigId);
        
        // Agregamos la nueva asistencia al array 'assists' de esa asignatura
        if (asignatura) {
          asignatura.assists.push(asistencia);
        }

        // Actualizamos el usuario con la nueva lista de asignaturas
        return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
      })
    );
}
}
