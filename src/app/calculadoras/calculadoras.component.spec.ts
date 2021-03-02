import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadorasComponent } from './calculadoras.component';

describe('CalculadorasComponent', () => {
  let component: CalculadorasComponent;
  let fixture: ComponentFixture<CalculadorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
