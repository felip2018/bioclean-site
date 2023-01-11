import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IProductToSave } from '../../models/iproducttosave';
import { CategoriesService } from '../../services/categories.service';
import { FragancesService } from '../../services/fragances.service';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.css']
})
export class ProductsRegisterComponent implements OnInit {

  applicationForm: FormGroup;
  showLoader = false;
  categories: any[];
  product_types: any[];
  units: any[];
  fragances: any[];

  constructor(private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productTypesService: ProductTypesService,
    private unitsService: UnitsService,
    private fragancesService: FragancesService,
    private productService: ProductsService) {

    this.categories = [];
    this.product_types = [];
    this.units = [];
    this.fragances = [];

    this.applicationForm = this.formBuilder.group({
      categoria_id: ['', Validators.required],
      codigo: ['', Validators.required],
      tipo_producto_id: ['', Validators.required],
      unidad_medida_id: ['', Validators.required],
      fragancia_id: [''],
      precio_publico: ['', Validators.required],
      precio_distribuidor: ['', Validators.required],
      cantidad: ['', Validators.required],
      stock_minimo: ['', Validators.required],
      stock_maximo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.categoriesService.getAll()),
        lastValueFrom(this.productTypesService.getAll()),
        lastValueFrom(this.unitsService.getAll()),
        lastValueFrom(this.fragancesService.getAll())
      ]);
      this.categories = result[0];
      this.product_types = result[1];
      this.units = result[2];
      this.fragances = result[3];
    } catch (err) {
      console.error(err);
    }
  }

  async submit() {
    this.showLoader = true;
    const body: IProductToSave = {
      ...this.applicationForm.value,
      ventas: 0,
      cantidad_real: this.applicationForm.controls['cantidad'].value
    };
    try {
      const response: any = await lastValueFrom(this.productService.save(body));
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: response?.message || 'Se ha realizado el registro de forma exitosa',
        footer: ''
      });
      this.applicationForm.reset();
      this.showLoader = false;
    } catch (err: any) {
      console.log('error > ', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.error?.message,
        footer: ''
      });
      this.showLoader = false;
    }
  }
}
