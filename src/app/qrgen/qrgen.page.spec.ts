import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { QrgenPage } from './qrgen.page';


// Mock de las dependencias
class MockRouter {
  navigate = jasmine.createSpy('navigate'); // Simulamos el método navigate del Router
}


class MockAuthService {
  registrarAsistencia = jasmine.createSpy('registrarAsistencia').and.returnValue({
    toPromise: jasmine.createSpy('toPromise').and.returnValue(Promise.resolve()) // Simulamos una respuesta exitosa
  });
}


class MockAlertController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve()) // Simulamos el comportamiento del alert
  });
}


describe('QrgenPage', () => {
  let component: QrgenPage;
  let fixture: ComponentFixture<QrgenPage>;
  let router: Router;
  let alertController: AlertController;
  let authService: AuthService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [QrgenPage],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AlertController, useClass: MockAlertController }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(QrgenPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    alertController = TestBed.inject(AlertController);
    authService = TestBed.inject(AuthService);


    // Configuramos el usuario simulado en localStorage
    const mockUser = {
      id: '123',
      asignatura: [
        { asigId: '005', asigName: 'Arquitectura', assists: [] },
        { asigId: '004', asigName: 'CalidadSof', assists: [] }
      ]
    };
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'currentUser') {
        return JSON.stringify(mockUser); // Simulamos que 'currentUser' está en localStorage
      }
      return null;
    });


    fixture.detectChanges();
  });


  it('debería crear el componente QrgenPage', () => {
    expect(component).toBeTruthy();
  });


  it('debería inicializar las asignaturas desde localStorage', () => {
    expect(component.asignaturas.length).toBe(2);
  });


  it('debería generar el código QR cuando se selecciona una asignatura', () => {
    component.asignaturaSeleccionada = '005';  // Seleccionamos una asignatura
    component.generarCodigoQr();
    expect(component.codigoQR).toBe('qr_005_Arquitectura');
  });


  it('debería mostrar un error si no se selecciona una asignatura al generar el código QR', async () => {
    component.asignaturaSeleccionada = '';  // No seleccionamos asignatura
    await component.generarCodigoQr();
    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor selecciona una asignatura',
      buttons: ['OK']
    });
  });


  it('debería mostrar un error cuando el registro de asistencia falle', async () => {
    component.asignaturaSeleccionada = '005';
    component.codigoQR = 'qr_005_Arquitectura';
   
    // Simulamos un fallo en `registrarAsistencia`
    authService.registrarAsistencia = jasmine.createSpy('registrarAsistencia').and.returnValue({
      toPromise: jasmine.createSpy('toPromise').and.returnValue(Promise.reject('Error'))
    });


    await component.registrarAsistencia();
    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Hubo un error al registrar la asistencia',
      buttons: ['OK']
    });
  });


 
});



