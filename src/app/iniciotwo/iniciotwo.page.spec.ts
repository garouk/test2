import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciotwoPage } from './iniciotwo.page';

describe('IniciotwoPage', () => {
  let component: IniciotwoPage;
  let fixture: ComponentFixture<IniciotwoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciotwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
