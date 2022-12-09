import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountItemsComponent } from './count-items.component';

describe('CountItemsComponent', () => {
  let component: CountItemsComponent;
  let fixture: ComponentFixture<CountItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
