import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeDistributorComponent } from './be-distributor.component';

describe('BeDistributorComponent', () => {
  let component: BeDistributorComponent;
  let fixture: ComponentFixture<BeDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
