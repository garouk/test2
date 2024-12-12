import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { AsignaturaPage } from './asignatura.page';


describe('AsignaturaPage', () => {
  let component: AsignaturaPage;
  let fixture: ComponentFixture<AsignaturaPage>;
  let router: Router;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;


  beforeEach(async () => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']); // Simulamos el ModalController con el método dismiss


    await TestBed.configureTestingModule({
      declarations: [AsignaturaPage],
      imports: [RouterTestingModule, IonicModule.forRoot()], // Importamos los módulos necesarios para las pruebas
      providers: [
        { provide: ModalController, useValue: modalControllerSpy }, // Inyectamos la simulación de ModalController
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(AsignaturaPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyectamos el Router
    fixture.detectChanges(); // Detectamos cambios en el ciclo de vida del componente
  });


  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Verificamos que el componente se haya creado correctamente
  });


  it('debería navegar a /inicio y cerrar el modal al llamar a volver', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espiamos el método navigate del Router


    component.volver(); // Ejecutamos la función volver


    expect(modalControllerSpy.dismiss).toHaveBeenCalled(); // Verificamos que se haya llamado a dismiss para cerrar el modal
    expect(navigateSpy).toHaveBeenCalledWith(['/inicio']); // Verificamos que se haya navegado a la ruta /inicio
  });
});