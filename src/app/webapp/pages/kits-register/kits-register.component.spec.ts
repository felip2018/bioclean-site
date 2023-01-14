import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsRegisterComponent } from './kits-register.component';

describe('KitsRegisterComponent', () => {
  let component: KitsRegisterComponent;
  let fixture: ComponentFixture<KitsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
