import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalContentPage } from './modal-content.page';


// Mock del ModalController
class MockModalController {
  dismiss = jasmine.createSpy('dismiss').and.returnValue(Promise.resolve(true));  // Simulamos el método dismiss
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present')  // Simula la creación del modal
  });
}


describe('ModalContentPage', () => {
  let component: ModalContentPage;
  let fixture: ComponentFixture<ModalContentPage>;
  let modalController: MockModalController;


  beforeEach(async () => {
    // Configuramos el TestBed para que use el mock del ModalController
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ModalContentPage],
      providers: [
        { provide: ModalController, useClass: MockModalController }  // Aquí reemplazamos ModalController por el mock
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(ModalContentPage);  // Creamos el componente
    component = fixture.componentInstance;  // Obtenemos la instancia del componente


    modalController = TestBed.inject(ModalController) as any;  // Inyectamos el mock del ModalController


    fixture.detectChanges();  // Detectamos los cambios del componente
  });


  it('debería crear el componente ModalContentPage', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });


  it('debería cerrar el modal cuando se llame a cerrarModal', () => {
    component.cerrarModal();  // Llamamos al método cerrarModal del componente


    // Verificamos que el método dismiss haya sido llamado
    expect(modalController.dismiss).toHaveBeenCalled();  // Verificamos que dismiss haya sido llamado
  });


  it('debería registrar un error si Asignatura no se recibe correctamente', () => {
    spyOn(console, 'log');  // Espiamos el log de consola


    component.Asignatura = null;  // Simulamos que no se ha recibido la asignatura
    component.ngOnInit();  // Llamamos al ngOnInit


    // Verificamos que se haya logueado el mensaje de error
    expect(console.log).toHaveBeenCalledWith('No se recibió la asignatura correctamente');
  });
});



