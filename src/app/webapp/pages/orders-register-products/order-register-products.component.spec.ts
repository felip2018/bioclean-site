import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRegisterProductsComponent } from './order-register-products.component';

describe('OrderRegisterProductsComponent', () => {
  let component: OrderRegisterProductsComponent;
  let fixture: ComponentFixture<OrderRegisterProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRegisterProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRegisterProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
