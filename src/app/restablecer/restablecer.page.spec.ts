import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { RestablecerPage } from './restablecer.page';


describe('RestablecerPage', () => {
  let component: RestablecerPage;
  let fixture: ComponentFixture<RestablecerPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;


  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['changePassword']);  // Creando un espía para AuthService
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);  // Creando un espía para Router


    TestBed.configureTestingModule({
      declarations: [RestablecerPage],  // Declarando el componente que vamos a probar
      imports: [RouterTestingModule, HttpClientModule],  // Importando los módulos necesarios
      providers: [
        { provide: AuthService, useValue: authServiceSpy },  // Usamos el espía de AuthService
        { provide: Router, useValue: routerSpy },  // Usamos el espía de Router
      ],
    });


    fixture = TestBed.createComponent(RestablecerPage);  // Creamos el componente
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;  // Inyectamos el espía de AuthService
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;  // Inyectamos el espía de Router
  });


  it('debería manejar el error en changePassword y no navegar', async () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword123';
    const confirmPassword = 'newPassword123';


    // Simulamos un error en la respuesta de changePassword (promesa rechazada)
    authService.changePassword.and.returnValue(Promise.reject('Error'));


    component.oldPassword = oldPassword;
    component.newPassword = newPassword;
    component.confirmPassword = confirmPassword;


    // Llamamos al método onSubmit()
    await component.onSubmit();


    // Verificamos que changePassword haya sido llamado con los parámetros correctos
    expect(authService.changePassword).toHaveBeenCalledWith(oldPassword, newPassword, confirmPassword);


    // Verificamos que no se haya realizado la navegación a la página 'inicio' debido al error
    expect(router.navigate).not.toHaveBeenCalled();
  });


  it('debería navegar a /inicio si changePassword tiene éxito', async () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword123';
    const confirmPassword = 'newPassword123';


    // Simulamos que changePassword se resuelve correctamente
    authService.changePassword.and.returnValue(Promise.resolve());


    component.oldPassword = oldPassword;
    component.newPassword = newPassword;
    component.confirmPassword = confirmPassword;


    // Llamamos al método onSubmit()
    await component.onSubmit();


    // Verificamos que changePassword haya sido llamado con los parámetros correctos
    expect(authService.changePassword).toHaveBeenCalledWith(oldPassword, newPassword, confirmPassword);


    // Verificamos que se haya realizado la navegación a la página 'inicio' después de que la contraseña se haya cambiado
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});



