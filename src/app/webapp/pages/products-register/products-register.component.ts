import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SS_IS_EDIT_PRODUCT, SS_PRODUCT_TO_EDIT } from '../../config/storageKeys';
import { IGeneric } from '../../models/igeneric';
import { IProductToSave } from '../../models/iproducttosave';
import { CategoriesService } from '../../services/categories.service';
import { FragancesService } from '../../services/fragances.service';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { UnitsService } from '../../services/units.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.css']
})
export class ProductsRegisterComponent implements OnInit {

  applicationForm: UntypedFormGroup;
  showLoader: boolean;
  categories: any[];
  product_types: any[];
  units: any[];
  fragances: any[];
  containers: IGeneric[];
  title: string;
  isEdit = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private categoriesService: CategoriesService,
    private productTypesService: ProductTypesService,
    private unitsService: UnitsService,
    private fragancesService: FragancesService,
    private productService: ProductsService,
    private utilsService: UtilsService,
    private storageService: StorageService) {

    this.title = '';
    this.categories = [];
    this.product_types = [];
    this.units = [];
    this.fragances = [];
    this.containers = [];

    this.showLoader = true;

    this.applicationForm = this.formBuilder.group({
      id: [''],
      categoria_id: ['', Validators.required],
      codigo: ['', Validators.required],
      tipo_producto_id: ['', Validators.required],
      envase_id: [''],
      valor_unidad: ['', Validators.required],
      unidad_medida_id: ['', Validators.required],
      fragancia_id: [''],
      precio_kit: ['', Validators.required],
      precio_publico: ['', Validators.required],
      precio_distribuidor: ['', Validators.required],
      cantidad: ['', Validators.required],
      ventas: [0, Validators.required],
      cantidad_real: ['', Validators.required],
      stock_minimo: ['', Validators.required],
      stock_maximo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLists();
    this.validateEdition();
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.categoriesService.getAll()),
        lastValueFrom(this.productTypesService.getAll()),
        lastValueFrom(this.unitsService.getAll()),
        lastValueFrom(this.fragancesService.getAll()),
        lastValueFrom(this.utilsService.getContainers())
      ]);
      this.categories = result[0];
      this.product_types = result[1];
      this.units = result[2];
      this.fragances = result[3];
      this.containers = result[4];
    } catch (err) {
      console.error(err);
    }
  }

  validateEdition() {
    const isEdit = this.storageService.getItem(SS_IS_EDIT_PRODUCT);
    this.isEdit = isEdit === 'si';
    if (this.isEdit) {
      this.title = 'Actualizar producto';
      const productInfo = JSON.parse(this.storageService.getItem(SS_PRODUCT_TO_EDIT) || '{}');
      this.applicationForm.controls['id'].setValue(productInfo.id);
      this.applicationForm.controls['categoria_id'].setValue(productInfo.categoria_id);
      this.applicationForm.controls['codigo'].setValue(productInfo.codigo);
      this.applicationForm.controls['tipo_producto_id'].setValue(productInfo.tipo_producto_id);
      this.applicationForm.controls['envase_id'].setValue(productInfo.envase_id);
      this.applicationForm.controls['valor_unidad'].setValue(productInfo.valor_unidad);
      this.applicationForm.controls['unidad_medida_id'].setValue(productInfo.unidad_medida_id);
      this.applicationForm.controls['fragancia_id'].setValue(productInfo.fragancia_id);
      this.applicationForm.controls['precio_publico'].setValue(productInfo.precio_publico);
      this.applicationForm.controls['precio_distribuidor'].setValue(productInfo.precio_distribuidor);
      this.applicationForm.controls['cantidad'].setValue(productInfo.cantidad);
      this.applicationForm.controls['ventas'].setValue(productInfo.ventas);
      this.applicationForm.controls['cantidad_real'].setValue(productInfo.cantidad_real);
      this.applicationForm.controls['stock_minimo'].setValue(productInfo.stock_minimo);
      this.applicationForm.controls['stock_maximo'].setValue(productInfo.stock_maximo);
    } else {
      this.title = 'Registrar producto';
    }
    this.showLoader = false;
  }

  quantityValidation() {
    const cantidad = this.applicationForm.controls['cantidad'].value;
    const ventas = this.applicationForm.controls['ventas'].value;
    this.applicationForm.controls['cantidad_real'].setValue(cantidad - ventas);
  }

  async submit() {
    this.showLoader = true;
    const body: IProductToSave = {
      ...this.applicationForm.value
    };
    try {
      let response: any;
      if (this.isEdit) {
        response = await lastValueFrom(this.productService.update(body));
      } else {
        response = await lastValueFrom(this.productService.save(body));
        this.applicationForm.reset();
      }

      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: response?.message || 'Se ha realizado el registro de forma exitosa',
        footer: ''
      });
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
