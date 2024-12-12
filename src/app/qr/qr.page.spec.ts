import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { QrPage } from './qr.page';


// Mock de las dependencias
class MockRouter {
  navigate = jasmine.createSpy('navigate');  // Crear un espía para el método navigate
}


class MockAuthService {
  registrarAsistencia = jasmine.createSpy('registrarAsistencia').and.returnValue({
    subscribe: jasmine.createSpy('subscribe')  // Simula la suscripción
  });
}


class MockPlatform {
  ready = jasmine.createSpy('ready').and.returnValue(Promise.resolve());  // Simula que la plataforma está lista
}


describe('QrPage', () => {
  let component: QrPage;
  let fixture: ComponentFixture<QrPage>;
  let mockRouter: MockRouter;
  let mockAuthService: MockAuthService;  // Aseguramos que el espía del servicio se use correctamente


  beforeEach(async () => {
    mockRouter = new MockRouter(); // Creamos una instancia de MockRouter
    mockAuthService = new MockAuthService();  // Creamos una instancia de MockAuthService


    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [QrPage],
      providers: [
        { provide: Router, useValue: mockRouter },  // Usamos el espía mockRouter
        { provide: AuthService, useValue: mockAuthService },  // Usamos el espía mockAuthService
        { provide: Platform, useClass: MockPlatform },
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(QrPage);
    component = fixture.componentInstance;


    // Configuramos el usuario simulado en localStorage
    const mockUser = {
      id: '123',
      asignatura: [
        { asigId: '1', asigName: 'Matemáticas' },
        { asigId: '2', asigName: 'Física' }
      ]
    };
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'currentUser') {
        return JSON.stringify(mockUser);
      }
      return null;
    });


    fixture.detectChanges();  // Detectar los cambios en el componente
  });


  it('debería crear el componente QrPage', () => {
    expect(component).toBeTruthy();
  });


  it('debería inicializar el usuario y las asignaturas desde localStorage', () => {
    expect(component.usuario.id).toBe('123');
    expect(component.asignaturas.length).toBe(2);
  });


  it('debería seleccionar una asignatura y generar qrText', () => {
    component.asignaturaSeleccionada = '1';
    component.seleccionarAsignaturaParaEscaneo();
    expect(component.qrText).toBe('qr_1_Matemáticas');
  });


  it('debería validar el QR correctamente', () => {
    component.asignaturaSeleccionada = '1';
    const validQr = 'qr_1_Matemáticas';  
    const invalidQr = 'qr_2_Física';  


    expect(component.validarCodigoQR(validQr)).toBeTrue();  
    expect(component.validarCodigoQR(invalidQr)).toBeFalse();  
  });


  it('debería iniciar el escaneo cuando se selecciona una asignatura', () => {
    spyOn(component, 'startScan');
    component.asignaturaSeleccionada = '1';
    component.seleccionarAsignaturaParaEscaneo();
    expect(component.startScan).toHaveBeenCalled();  
  });


  it('debería navegar a /inicio cuando se llama a volver', () => {
    component.volver();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);  // Verificamos si el espía fue llamado con '/inicio'
  });
});



