import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IGeneric } from '../../models/igeneric';
import { IKit } from '../../models/ikit';
import { IKitWithProducts } from '../../models/ikitwithproducts';
import { IOrderToSave } from '../../models/iordertosave';
import { IUnit } from '../../models/iunit';
import { FragancesService } from '../../services/fragances.service';
import { OrdersService } from '../../services/orders.service';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';
import { UnitsService } from '../../services/units.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-order-register-products',
  templateUrl: './order-register-products.component.html',
  styleUrls: ['./order-register-products.component.css']
})
export class OrdersRegisterProductsComponent implements OnInit {

  applicationForm: FormGroup;
  showLoader: boolean;
  productsArray: any[];
  productsList: any[];
  kit: string = '';
  kit_number: number = 1;
  KitsArray: IKitWithProducts[];
  kitsList: IKit[];
  productTypesList: IGeneric[] = [];
  unitsList: IUnit[] = [];
  fragancesList: IGeneric[] = [];

  showKitForm: boolean;
  showProductForm: boolean;

  today: string = '';

  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private productTypesService: ProductTypesService,
    private unitsService: UnitsService,
    private fragancesService: FragancesService) {

      this.showLoader = false;
      this.productsArray = [];
      this.productsList = [];
      this.KitsArray = [];
      this.kitsList = [];
      this.showKitForm = false;
      this.showProductForm = false;

      let date = new Date();
      date.setDate(date.getDate()+2);
      const month = date.getMonth()+1;
      const day = date.getDate();
      this.today = `${date.getFullYear()}-${(month<10)?'0'+month:month}-${(day<10)?'0'+day:day}`;

      this.applicationForm = this.formBuilder.group({
        usuario_id: ['', Validators.required],
        total: ['', Validators.required],
        fecha_entrega: ['', Validators.required],
        tipo: ['', Validators.required],
        estado_pedido: ['', Validators.required],
        productos: this.formBuilder.array([])
      });
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.productsService.getKitsAndProducts()),
        lastValueFrom(this.productTypesService.getAll()),
        lastValueFrom(this.unitsService.getAll()),
        lastValueFrom(this.fragancesService.getAll())
      ]);
      this.KitsArray        = result[0];
      this.productTypesList = result[1];
      this.unitsList        = result[2];
      this.fragancesList    = result[3];

    } catch (err) {
      console.error(err);
    }
  }

  showForm(form: string) {
    if (form === 'kit') {
      this.showKitForm = !this.showKitForm;
    }
    if (form === 'product') {
      this.showProductForm = !this.showProductForm;
    }
  }

  addKit() {
    if (this.kit && this.kit_number >= 1) {
      const kit = this.KitsArray.filter((item) => {return item.kit.id === Number(this.kit)})[0];
      kit.products.map((item) => {
        (this.applicationForm.controls['productos'] as FormArray).push(this.formBuilder.group({
          kit_id: [item.kit_id || ''],
          tipo_producto_id: [item.tipo_producto_id, Validators.required],
          unidad_medida_id: [item.unidad_medida_id, Validators.required],
          fragancia_id: [''],
          cantidad: [this.kit_number, Validators.required],
          precio: [0, Validators.required],
          subtotal: [0, Validators.required],
          cambio: [0, Validators.required],
        }));
      });
      this.productsList = this.applicationForm.controls['productos'].value;
      console.log('productList > ', this.productsList);
    }
  }

  addProduct() {
    (this.applicationForm.controls['productos'] as FormArray).push(this.formBuilder.group({
      kit_id: [''],
      tipo_producto_id: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      subtotal: ['', Validators.required],
      cambio: ['', Validators.required],
    }));
    this.productsList = this.applicationForm.controls['productos'].value;
  }

  removeProduct(index: number) {
    if ((this.applicationForm.controls['productos'] as FormArray).length > 1) {
      (this.applicationForm.controls['productos'] as FormArray).removeAt(index);
      this.productsList = this.applicationForm.controls['productos'].value;
    }
  }

  async submit() {
    this.showLoader = true;
    const body: IOrderToSave = {
      ...this.applicationForm.value
    };
    try {
      let response: any;

      response = await lastValueFrom(this.ordersService.save(body));
      this.applicationForm.reset();

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
