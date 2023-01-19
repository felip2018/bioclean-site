import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IOrderToSave } from '../../models/iordertosave';
import { OrdersService } from '../../services/orders.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-order-register-products',
  templateUrl: './order-register-products.component.html',
  styleUrls: ['./order-register-products.component.css']
})
export class OrdersRegisterProductsComponent implements OnInit {

  applicationForm: FormGroup;
  showLoader: boolean;
  productsList: [];

  constructor(private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private utilsService: UtilsService) {
      this.showLoader = false;
      this.productsList = [];
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
  }

  addProduct() {
    (this.applicationForm.controls['productos'] as FormArray).push(this.formBuilder.group({
      kit_id: [''],
      producto_id: ['', Validators.required],
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
