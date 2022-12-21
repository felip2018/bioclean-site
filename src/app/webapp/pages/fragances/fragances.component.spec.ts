import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragancesComponent } from './fragances.component';

describe('FragancesComponent', () => {
  let component: FragancesComponent;
  let fixture: ComponentFixture<FragancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FragancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
