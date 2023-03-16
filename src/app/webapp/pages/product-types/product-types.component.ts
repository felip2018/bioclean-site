import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IGeneric } from '../../models/igeneric';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css']
})
export class ProductTypesComponent implements OnInit {
  showForm: boolean;
  productTypesList: IGeneric[] = [];
  applicationForm: UntypedFormGroup;
  isUpdate: boolean;

  constructor(private formBuilder: UntypedFormBuilder,
              private productTypesService: ProductTypesService) {
    this.showForm = false;
    this.isUpdate = false;
    this.applicationForm = this.formBuilder.group({
      id: [0],
      nombre: ['', Validators.required],
      estado: ['Activo'],
    });
  }

  ngOnInit(): void {
    this.getProductTypes();
  }

  async getProductTypes() {
    try {
      this.productTypesList = await lastValueFrom(this.productTypesService.getAll());
    } catch (error) {
      console.error(error);
    }
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
  }

  formatText(field: string) {
    const value = this.applicationForm.controls[field].value;
    this.applicationForm.controls[field].setValue(value ? (value as string).toUpperCase() : '');
  }

  async submit() {
    try {
      if (!this.isUpdate){
        await lastValueFrom(this.productTypesService.save(this.applicationForm.value))
      } else {
        await lastValueFrom(this.productTypesService.update(this.applicationForm.value))
        this.isUpdate = false;
      }
      this.applicationForm.reset();
      this.getProductTypes();
    } catch (error: any) {
      console.log('error > ', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.error?.message,
        footer: ''
      })
    }
  }

  updateProductType(productType: IGeneric) {
    this.isUpdate = true;
    this.applicationForm.controls['id'].setValue(productType.id);
    this.applicationForm.controls['nombre'].setValue(productType.nombre);
    this.applicationForm.controls['estado'].setValue(productType.estado);
    this.showForm = true;
  }

  async updateStatus(unit: IGeneric, status: string) {
    unit.estado = status;
    await lastValueFrom(this.productTypesService.update(unit));
    this.getProductTypes();
  }
}
