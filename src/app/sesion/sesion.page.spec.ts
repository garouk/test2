import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importamos el módulo para simular HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta
import { SesionPage } from './sesion.page'; // Ajusta según tu ruta


describe('SesionPage', () => {
  let component: SesionPage;
  let fixture: ComponentFixture<SesionPage>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Agregamos el HttpClientTestingModule para manejar las dependencias de HttpClient
      declarations: [SesionPage],  // Componente que estamos probando
      providers: [AuthService],  // Proveemos el AuthService (ya con HttpClientMock)
    }).compileComponents();


    fixture = TestBed.createComponent(SesionPage);
    component = fixture.componentInstance;
  });


  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Comprobamos que el componente se haya creado correctamente
  });
});



