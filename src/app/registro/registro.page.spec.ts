import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegistroPage } from './registro.page';


// Mock de Router (simulamos el comportamiento del Router)
class MockRouter {
  navigate = jasmine.createSpy('navigate'); // Simulamos el método navigate del router
}


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [RegistroPage],
      providers: [
        { provide: Router, useClass: MockRouter } // Usamos el MockRouter en lugar del Router real
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);


    // Configuramos el usuario simulado en localStorage
    spyOn(localStorage, 'setItem'); // Simulamos el método setItem de localStorage
    spyOn(localStorage, 'clear'); // Simulamos el método clear de localStorage


    fixture.detectChanges();
  });


  it('debería crear el componente RegistroPage', () => {
    // Verificamos que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });


  it('debería registrar al usuario y navegar a la página de sesión', () => {
    // Simulamos que el usuario ingresa sus datos en el formulario de registro
    component.name = 'John Doe';
    component.email = 'john.doe@example.com';
    component.password = '123456';
    component.repassword = '123456';


    // Simulamos el proceso de registro del usuario
    component.register();


    const expectedUser = {
      name: 'John Doe',
      password: '123456'
    };


    // Verificamos que los datos del usuario se hayan guardado correctamente en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(expectedUser));
   
    // Verificamos que después de registrar, se navegue a la página de sesión
    expect(router.navigate).toHaveBeenCalledWith(['/sesion']);
  });


  it('debería limpiar el localStorage cuando se llame a clearLocalStorage', () => {
    // Llamamos al método clearLocalStorage para limpiar los datos en localStorage
    component.clearLocalStorage();


    // Verificamos que el método clear haya sido llamado, lo que implica que localStorage se ha limpiado
    expect(localStorage.clear).toHaveBeenCalled();
  });
});



