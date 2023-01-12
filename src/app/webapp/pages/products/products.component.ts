import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SS_IS_EDIT_PRODUCT, SS_PRODUCT_TO_EDIT } from '../../config/storageKeys';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[];
  productsList: IProduct[];

  constructor(private router: Router,
    private productsService: ProductsService,
    private storageService: StorageService) {
    this.products = [];
    this.productsList = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(this.productsService.getAll({type: 'all'})) as IProduct[];
      this.productsList = this.products;
    } catch (err) {
      console.error(err);
    }
  }

  async updateStatus(id: number, estado: string) {
    await lastValueFrom(this.productsService.updateStatus({id, estado}));
    this.getProducts();
  }

  editProduct(element: IProduct) {
    this.storageService.setItem(SS_PRODUCT_TO_EDIT, JSON.stringify(element));
    this.storageService.setItem(SS_IS_EDIT_PRODUCT, 'si');
    this.router.navigate(['webapp/edit-product']);
  }

  showRegisterForm() {
    this.storageService.setItem(SS_IS_EDIT_PRODUCT, 'no');
    this.router.navigate(['webapp/register-product']);
  }
}
