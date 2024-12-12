import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { AsistenciaPage } from './asistencia.page';


describe('AsistenciaPage', () => {
  let component: AsistenciaPage;
  let fixture: ComponentFixture<AsistenciaPage>;
  let router: Router;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;


  beforeEach(async () => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']); // Simulamos el ModalController


    await TestBed.configureTestingModule({
      declarations: [AsistenciaPage],
      imports: [RouterTestingModule, IonicModule.forRoot()], // Importamos el RouterTestingModule y IonicModule para pruebas
      providers: [
        { provide: ModalController, useValue: modalControllerSpy }, // Inyectamos el controlador de modales simulado
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(AsistenciaPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyectamos el Router
    fixture.detectChanges(); // Detectamos cambios en el ciclo de vida del componente
  });


  it('debería registrar la asistencia para una asignatura dada', () => {
    // Datos de prueba
    const mockAsignatura = {
      asigId: '1',
      asigName: 'Matemáticas',
      assists: []  // Inicializamos el arreglo vacío de asistencias
    };


    const mockUser = {
      asignatura: [mockAsignatura], // Asignaturas del usuario
    };


    // Simula el localStorage con un valor de usuario
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    spyOn(localStorage, 'setItem'); // Espiamos el método setItem de localStorage
    spyOn(window, 'alert'); // Espiamos el método alert de la ventana


    // Ejecuta el método registrarAsistencia con la asignatura mock
    component.registrarAsistencia(mockAsignatura);


    // Verificamos que se haya agregado una asistencia
    expect(mockAsignatura.assists.length).toBe(1);


    // Verificamos que se haya actualizado el localStorage
    expect(localStorage.setItem).toHaveBeenCalled();


    // Verificamos que se haya mostrado el mensaje de alerta
    expect(window.alert).toHaveBeenCalledWith('Asistencia registrada para: Matemáticas');
  });
});
