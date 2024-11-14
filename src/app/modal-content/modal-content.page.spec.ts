import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContentPage } from './modal-content.page';

describe('ModalContentPage', () => {
  let component: ModalContentPage;
  let fixture: ComponentFixture<ModalContentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
