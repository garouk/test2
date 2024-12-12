import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.1.88:3000';  // URL base del servidor json-server
  
//Javiera gay aqui va el ip cuando estes conectada a la internet ( Dirección IPv4. )
//ipconfig
// Despues de conectarse a internet
//json-server --host 0.0.0.0 --port 3000 db.json


  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  // Método de login para autenticación de usuarios
  login(name: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.name === name && u.password === password);
        if (usuario) {
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          localStorage.setItem('userName', usuario.name);
          localStorage.setItem('userType', usuario.tipo);
          return usuario;
        } else {
          // Mostrar una alerta de error
          this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['OK']
          }).then(alert => alert.present());
          throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un problema con la conexión o la solicitud.',
          buttons: ['OK']
        }).then(alert => alert.present());
        throw new Error(error.message);
      })
    );
  }  

  // Método de logout para cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');  // Limpiar los datos del usuario
    this.router.navigate(['/sesion']);  // Redirigir a la página de sesión
  }

  // Obtener tipo de usuario desde localStorage
  getUserType(): string {
    return localStorage.getItem('userType') || '';  // Si no hay un tipo de usuario, retornar vacío
  }

  // Obtener nombre de usuario desde localStorage
  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  // Método para obtener las asignaturas del usuario
  obtenerAsignaturasDeUsuario(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(  // Cambiar el tipo a `any` en vez de `any[]`
      map(usuario => {
        return usuario && usuario.asignatura ? usuario.asignatura : [];  // Cambiar 'asignatura' por el nombre correcto según el json
      }),
      catchError(error => {
        throw new Error('Error al obtener las asignaturas: ' + error.message);
      })
    );
  }

  // Método para registrar asistencia de un usuario en una asignatura
  registrarAsistencia(userId: string, asigId: string, asistencia: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.asignatura || !Array.isArray(usuario.asignatura)) {
          throw new Error('No se encontraron asignaturas para el usuario.');
        }
  
        const asignatura = usuario.asignatura.find((asig: { asigId: string; }) => asig.asigId === asigId);
        
        if (asignatura) {
          asignatura.assists.push(asistencia);  // Agregar la nueva asistencia a la asignatura
        } else {
          throw new Error('Asignatura no encontrada.');
        }
  
        // Actualizar los datos de la asignatura en el servidor (json-server)
        return this.http.put<any>(`${this.apiUrl}/users/${userId}`, usuario).pipe(
          map((updatedUser) => {
            // Si la actualización es exitosa, también actualizamos el localStorage
            let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (currentUser && currentUser.id === userId) {
              // Actualizar las asignaturas en localStorage
              const updatedAsignaturas = currentUser.asignatura.map((asig: any) => {
                if (asig.asigId === asigId) {
                  asig.assists = [...asig.assists, asistencia];  // Añadir la nueva asistencia
                }
                return asig;
              });
  
              currentUser.asignatura = updatedAsignaturas;
              localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Guardar los cambios en localStorage
            }
  
            return updatedUser;  // Retornar la respuesta del servidor
          }),
          catchError((error) => {
            throw new Error('Error al actualizar la asistencia en la base de datos: ' + error.message);
          })
        );
      }),
      catchError(error => {
        throw new Error('Error al obtener los datos del usuario: ' + error.message);
      })
    );
  }

  // Método para cambiar la contraseña del usuario
  async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    try {
      // Obtener el usuario desde localStorage
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
  
      // Hacer la solicitud PUT para actualizar la contraseña en el servidor
      await this.http.put(`${this.apiUrl}/users/${currentUser.id}`, currentUser).toPromise();
  
      // Mostrar mensaje de éxito
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Contraseña cambiada correctamente',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Mostrar mensaje de error si ocurre algún problema
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un error al cambiar la contraseña',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}