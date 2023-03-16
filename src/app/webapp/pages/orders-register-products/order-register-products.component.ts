import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SS_CUSTOMER_INFO, SS_USER_DATA } from '../../config/storageKeys';
import Swal from 'sweetalert2';
import { IGeneric } from '../../models/igeneric';
import { IKit } from '../../models/ikit';
import { IKitWithProducts } from '../../models/ikitwithproducts';
import { IOrderToSave } from '../../models/iordertosave';
import { IProduct } from '../../models/iproduct';
import { IUnit } from '../../models/iunit';
import { FragancesService } from '../../services/fragances.service';
import { OrdersService } from '../../services/orders.service';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-order-register-products',
  templateUrl: './order-register-products.component.html',
  styleUrls: ['./order-register-products.component.css']
})
export class OrdersRegisterProductsComponent implements OnInit {
  applicationForm: UntypedFormGroup;

  productsDb: IProduct[];
  filteredProductsList: IProduct[];
  productsList: any[] = [];

  product_type_id: number = 0;

  kitsDb: IKitWithProducts[] = [];
  filteredKit: any = [];
  kit_id: string = '';
  kit_number: number = 1;

  showLoader: boolean;
  kitsList: IKit[];
  productTypesList: IGeneric[] = [];
  unitsList: IUnit[] = [];
  fragancesList: IGeneric[] = [];

  showKitForm: boolean;
  showProductForm: boolean;

  today: string = '';
  userName: string = '';

  constructor(private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private productTypesService: ProductTypesService,
    private unitsService: UnitsService,
    private fragancesService: FragancesService,
    private storageService: StorageService) {

    this.productsDb = [];
    this.showLoader = false;
    this.filteredProductsList = [];

    this.kitsList = [];
    this.showKitForm = false;
    this.showProductForm = false;

    let date = new Date();
    date.setDate(date.getDate()+2);
    const month = date.getMonth()+1;
    const day = date.getDate();
    this.today = `${date.getFullYear()}-${(month<10)?'0'+month:month}-${(day<10)?'0'+day:day}`;

    const userData = JSON.parse(this.storageService.getItem(SS_USER_DATA) || '{}');
    this.userName = `${userData.primer_nombre} ${userData.segundo_nombre} ${userData.primer_apellido} ${userData.segundo_apellido}`;

    this.applicationForm = this.formBuilder.group({
      usuario_id: [userData ? userData.usuario_id : 1, Validators.required],
      total: ['', Validators.required],
      fecha_entrega: ['', Validators.required],
      tipo: ['Pedido', Validators.required],
      estado_pedido: ['Pendiente', Validators.required],
      productos: this.formBuilder.array([])
    });

    this.applicationForm.valueChanges.subscribe(data => console.log('form data > ', data));
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.productsService.getKitsAndProducts({status: 'Activo'})),
        lastValueFrom(this.productTypesService.getAll()),
        lastValueFrom(this.unitsService.getAll()),
        lastValueFrom(this.fragancesService.getAll()),
        lastValueFrom(this.productsService.getAll({status: 'Activo'})),
      ]);
      this.kitsDb           = result[0];
      this.productTypesList = result[1];
      this.unitsList        = result[2];
      this.fragancesList    = result[3];
      this.productsDb       = result[4] as IProduct[];
    } catch (err) {
      console.error(err);
    }
  }

  showForm(form: string) {
    if (form === 'product') {
      this.filteredProductsList = [];
      this.showProductForm = !this.showProductForm;
    }
  }

  filterProductByType() {
    this.filteredProductsList = this.productsDb.filter((item) => {return item.tipo_producto_id == this.product_type_id});
  }

  filterKit() {
    this.filteredKit = this.kitsDb.filter((item) => {return item.kit.id == Number(this.kit_id)});
    console.log('filtered kit >> ', this.filteredKit);
  }

  addKit() {
    if (this.kit_id && this.kit_number >= 1) {
      const kit = this.kitsDb.filter((item) => {return item.kit.id === Number(this.kit_id)})[0];
      kit.products.map((item) => {
        (this.applicationForm.controls['productos'] as UntypedFormArray).push(this.formBuilder.group({
          kit_id: [item.kit_id || ''],
          producto_id: [item.tipo_producto_id, Validators.required],
          descripcion: [item.unidad_medida_id, Validators.required],
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

  addProduct(product_id: number) {
    const product = this.productsDb.filter((item) => {
      return item.id == product_id
    })[0];
    const products: any[] = this.applicationForm.controls['productos'].value;
    const validate = products.find((item) => {return item.producto_id == product.id});
    if (!validate) {
      (this.applicationForm.controls['productos'] as UntypedFormArray).push(this.formBuilder.group({
        producto_id: [product.id, Validators.required],
        descripcion: [`${this.getProductDescription(product)}`],
        cantidad: [1, Validators.required],
        precio: ['', Validators.required],
        subtotal: ['', Validators.required],
        tipo: ['', Validators.required]
      }));
      this.productsList = this.applicationForm.controls['productos'].value;
    }
  }

  updateType(product_id: number, index: number) {
    const element = (this.applicationForm.controls['productos'] as UntypedFormArray).controls[index];
    const type = element.get('tipo')?.value;
    const cantidad = element.get('cantidad')?.value;
    const productValue = this.getProductValue(product_id, type);
    element.get('precio')?.setValue(productValue);
    element.get('subtotal')?.setValue((productValue*cantidad));
    this.productsList = this.applicationForm.controls['productos'].value;
    this.evaluateTotal();
  }

  evaluateTotal() {
    let total = 0;
    const products = this.applicationForm.controls['productos'].value;
    products.map((element: any) => {
      total += element.subtotal
    });
    this.applicationForm.controls['total'].setValue(Number(total));
  }

  getProductValue(productId: number, type: string) {
    const product = this.productsDb.find(product => product.id === productId);
    if (product) {
      if (type === 'precio_publico') {
        return Number(product.precio_publico);
      }
      if (type === 'precio_kit') {
        return Number(product.precio_kit);
      }
      if (type === 'precio_distribuidor') {
        return Number(product.precio_distribuidor);
      }
      return 0;
    } else {
      return 0;
    }
  }

  updateQuantity(type: string, index: number) {
    const products: any[] = this.applicationForm.controls['productos'].value;
    if (type === 'up') {
      products[index].cantidad += 1;
    }
    if (type === 'down' && products[index].cantidad > 1) {
      products[index].cantidad -= 1;
    }
    products[index].subtotal = (products[index].precio * products[index].cantidad);
    this.applicationForm.controls['productos'].setValue(products);
    this.productsList = this.applicationForm.controls['productos'].value;
    this.evaluateTotal();
  }

  getProductDescription(product: IProduct) {
    return `${product.tipo_producto} ${(product.envase) ? product.envase : ''} X ${product.valor_unidad} ${product.unidad_medida} ${(product.fragancia) ? product.fragancia : ''}`;
  }

  removeProduct(index: number) {
    (this.applicationForm.controls['productos'] as UntypedFormArray).removeAt(index);
    this.productsList = this.applicationForm.controls['productos'].value;
  }

  async submit() {
    this.showLoader = true;
    const customerData = JSON.parse(this.storageService.getItem(SS_CUSTOMER_INFO) || '{}');
    const body: IOrderToSave = {
      persona_id: customerData.id,
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
      this.storageService.removeItem(SS_CUSTOMER_INFO);
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
