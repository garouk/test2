import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // Asegúrate de importar RouterTestingModule
import { AuthService } from '../auth.service';
import { InicioPage } from './inicio.page';


// Mock de AuthService si es necesario
class MockAuthService {
  // Aquí puedes agregar los métodos mockeados necesarios
}


describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let router: Router;  // Inyectar Router desde RouterTestingModule


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Usar RouterTestingModule para simular el enrutamiento
      declarations: [InicioPage],
      providers: [
        { provide: AuthService, useClass: MockAuthService },  // Si es necesario mockear AuthService
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;


    // Inyectamos el Router desde RouterTestingModule
    router = TestBed.inject(Router);  // Inyección correcta del Router


    fixture.detectChanges();
  });


  it('debería crear el componente InicioPage', () => {
    expect(component).toBeTruthy();  // Verificamos que el componente se haya creado correctamente
  });


  it('debería inicializar userName y userId desde localStorage', () => {
    // Mock de localStorage
    const mockUser = { id: '123', name: 'John Doe' };
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'currentUser') {
        return JSON.stringify(mockUser);
      } else if (key === 'userName_123') {
        return 'John Doe';
      }
      return null;
    });


    // Ejecutamos ngOnInit() para inicializar los valores
    component.ngOnInit();


    // Verificamos que los valores se hayan inicializado correctamente
    expect(component.userId).toBe('123');
    expect(component.userName).toBe('John Doe');
  });


  it('debería establecer userName como "Usuario desconocido" cuando no haya currentUser en localStorage', () => {
    // Mock de localStorage para no tener un currentUser
    spyOn(localStorage, 'getItem').and.callFake(() => null);


    // Ejecutamos ngOnInit() para inicializar los valores
    component.ngOnInit();


    // Verificamos que userName se haya establecido como "Usuario desconocido"
    expect(component.userName).toBe('Usuario desconocido');
  });


  it('debería limpiar localStorage y navegar a /sesion al hacer logout', () => {
    // Espiar localStorage.clear y router.navigate
    spyOn(localStorage, 'clear');
    spyOn(router, 'navigate');  // Verificamos que el router navegue correctamente


    // Llamamos al método logout
    component.logout();


    // Verificamos que localStorage.clear() haya sido llamado
    expect(localStorage.clear).toHaveBeenCalled();


    // Verificamos que el router haya navegado a '/sesion'
    expect(router.navigate).toHaveBeenCalledWith(['/sesion']);
  });
});



