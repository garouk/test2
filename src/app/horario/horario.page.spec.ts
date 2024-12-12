import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HorarioPage } from './horario.page';


describe('HorarioPage', () => {
  let component: HorarioPage;
  let fixture: ComponentFixture<HorarioPage>;
  let router: Router;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;


  beforeEach(async () => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']); // Simulamos el controlador de modales


    await TestBed.configureTestingModule({
      declarations: [HorarioPage],
      imports: [RouterTestingModule, IonicModule.forRoot()], // Importamos el RouterTestingModule para pruebas de enrutamiento
      providers: [
        { provide: ModalController, useValue: modalControllerSpy }, // Inyectamos el controlador de modales simulado
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(HorarioPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyectamos el Router
    fixture.detectChanges(); // Detectamos cambios en el ciclo de vida del componente
  });


  it('debería crear el componente', () => {
    // Verificamos que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });


  it('debería navegar a /iniciotwo y cerrar el modal al llamar a volver', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espiamos el método navigate del Router


    component.volver(); // Llamamos al método volver


    // Verificamos que se haya cerrado el modal
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
    // Verificamos que se haya navegado a la página /iniciotwo
    expect(navigateSpy).toHaveBeenCalledWith(['/iniciotwo']);  // Aquí corregimos la ruta esperada
  });
});



