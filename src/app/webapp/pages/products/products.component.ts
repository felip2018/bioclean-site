import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[];
  productsList: IProduct[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService) {
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

  editProduct(id: number) {
    console.log(`editar producto id:: ${id}`);
  }

  showRegisterForm() {
    console.log('products.showRegisterForm()');
    this.router.navigate(['register-product'], {relativeTo: this.route.firstChild});
  }
}
