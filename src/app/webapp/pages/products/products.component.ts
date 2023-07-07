import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SS_IS_EDIT_PRODUCT, SS_PRODUCT_TO_EDIT } from '../../config/storageKeys';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { ProductTypesService } from '../../services/product-types.service';
import { IGeneric } from '../../models/igeneric';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productTypeId: number = 0;
  productTypesList: IGeneric[] = [];
  products: IProduct[];
  productsList: IProduct[];

  constructor(private router: Router,
    private productTypesService: ProductTypesService,
    private productsService: ProductsService,
    private storageService: StorageService) {
    this.products = [];
    this.productsList = [];
  }

  ngOnInit(): void {
    this.getProductTypes();
    this.getProducts();
  }

  async getProductTypes() {
    try {
      this.productTypesList = await lastValueFrom(this.productTypesService.getAll());
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(this.productsService.getAll({})) as IProduct[];
      //this.productsList = this.products;
    } catch (err) {
      console.error(err);
    }
  }

  filterListByProductType() {
    this.productsList = this.products.filter((product) => {
      return product.tipo_producto_id == this.productTypeId;
    });
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

  getDataFile(event: any) {
    const dataFile = event;
    if (dataFile) {
      console.log('dataFile >> ', dataFile);
    }
  }
}
