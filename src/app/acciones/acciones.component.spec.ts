import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccionesComponent } from './acciones.component';

describe('AccionesComponent', () => {
  let component: AccionesComponent;
  let fixture: ComponentFixture<AccionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
