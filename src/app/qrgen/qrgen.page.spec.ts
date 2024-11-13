import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrgenPage } from './qrgen.page';

describe('QrgenPage', () => {
  let component: QrgenPage;
  let fixture: ComponentFixture<QrgenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrgenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
