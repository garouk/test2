import { HttpClientTestingModule } from '@angular/common/http/testing'; // Necesario para las pruebas de HttpClient
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // Necesario para el router
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';




describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,  // Para el enrutamiento
        HttpClientTestingModule,  // Para las pruebas de HttpClient
      ],
      providers: [AuthGuard, AuthService],  // Proporciona AuthGuard y AuthService
    });


    // Obtener instancias inyectadas
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });


  it('debería ser creado', () => {
    expect(authGuard).toBeTruthy(); // Verifica que el guard se haya creado correctamente
  });


  // Puedes agregar más pruebas para las funciones del guard aquí
});
