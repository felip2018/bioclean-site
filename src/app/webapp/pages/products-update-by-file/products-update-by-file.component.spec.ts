import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdateByFileComponent } from './products-update-by-file.component';

describe('ProductsUpdateByFileComponent', () => {
  let component: ProductsUpdateByFileComponent;
  let fixture: ComponentFixture<ProductsUpdateByFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsUpdateByFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsUpdateByFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
