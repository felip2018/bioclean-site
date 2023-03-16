import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SS_IS_EDIT_KIT, SS_KIT_TO_EDIT } from '../../config/storageKeys';
import { IKitToSave } from '../../models/ikittosave';
import { CategoriesService } from '../../services/categories.service';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-kits-register',
  templateUrl: './kits-register.component.html',
  styleUrls: ['./kits-register.component.css']
})
export class KitsRegisterComponent implements OnInit {

  applicationForm: UntypedFormGroup;
  categories: any[];
  productTypes: any[];
  unitTypes: any[];
  productsKit: [];
  showLoader = false;
  title = '';
  isEdit = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private unitsService: UnitsService,
    private productTypesService: ProductTypesService,
    private storageService: StorageService) {

    this.categories = [];
    this.productTypes = [];
    this.unitTypes = [];
    this.productsKit = [];

    this.applicationForm = this.formBuilder.group({
      id: [''],
      categoria_id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      productos: this.formBuilder.array([])
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
        lastValueFrom(this.unitsService.getAll())
      ]);
      this.categories = result[0];
      this.productTypes = result[1];
      this.unitTypes = result[2];
    } catch (err) {
      console.error(err);
    }
  }

  async validateEdition() {
    const isEdit = this.storageService.getItem(SS_IS_EDIT_KIT);
    this.isEdit = isEdit === 'si';
    if (this.isEdit) {
      this.title = 'Actualizar kit';
      const kitId = Number(this.storageService.getItem(SS_KIT_TO_EDIT));
      const kitInfo = await lastValueFrom(this.productService.getKitInfo(kitId));

      this.applicationForm.controls['id'].setValue(kitInfo.kit.id);
      this.applicationForm.controls['categoria_id'].setValue(kitInfo.kit.categoria_id);
      this.applicationForm.controls['nombre'].setValue(kitInfo.kit.nombre);
      this.applicationForm.controls['precio'].setValue(kitInfo.kit.precio);

      kitInfo.products.map((product) => {
        (this.applicationForm.controls['productos'] as UntypedFormArray).push(this.formBuilder.group({
          tipo_producto_id: [product.tipo_producto_id, Validators.required],
          valor_unidad:     [product.valor_unidad, Validators.required],
          unidad_medida_id: [product.unidad_medida_id, Validators.required]
        }));
        this.productsKit = this.applicationForm.controls['productos'].value;
      });

    } else {
      this.title = 'Registrar kit';
      this.addProduct();
    }
  }

  addProduct() {
    (this.applicationForm.controls['productos'] as UntypedFormArray).push(this.formBuilder.group({
      id: [''],
      tipo_producto_id: ['', Validators.required],
      valor_unidad: ['', Validators.required],
      unidad_medida_id: ['', Validators.required]
    }));
    this.productsKit = this.applicationForm.controls['productos'].value;
  }

  removeProduct(index: number) {
    if ((this.applicationForm.controls['productos'] as UntypedFormArray).length > 1) {
      (this.applicationForm.controls['productos'] as UntypedFormArray).removeAt(index);
      this.productsKit = this.applicationForm.controls['productos'].value;
    }
  }

  async submit() {
    this.showLoader = true;
    const body: IKitToSave = {
      ...this.applicationForm.value
    };
    try {
      let response: any;
      if (this.isEdit) {
        response = await lastValueFrom(this.productService.updateKit(body));
      } else {
        response = await lastValueFrom(this.productService.saveKit(body));
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
