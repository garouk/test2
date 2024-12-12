import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importamos el módulo de pruebas HTTP
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let servicio: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo de pruebas HTTP
      providers: [AuthService]  // Proveemos el servicio AuthService
    });
    servicio = TestBed.inject(AuthService);  // Inyectamos el servicio en la prueba
  });


  it('debería ser creado', () => {
    expect(servicio).toBeTruthy();  // Verificamos que el servicio se haya creado correctamente
  });
});