import { Injectable } from '@angular/core';
import { SS_CART } from '../config/ss_keys';
import { IProductCart } from '../models/iproduct-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(productName: string, price: number) {
    if (!sessionStorage.getItem(SS_CART)) {
      this.addProductToCart(productName, price);
    } else {
      const products: IProductCart[] = JSON.parse(sessionStorage.getItem(SS_CART) || '[]');
      const exists = products.find(product => product.productName === productName);
      if (!exists) {
        this.addProductToCart(productName, price);
      } else {
        const index = products.indexOf(exists);
        this.updateProductQuantity(index, 'up');
      }
    }
  }

  addProductToCart(productName: string, price: number) {
    const products: IProductCart[] = JSON.parse(sessionStorage.getItem(SS_CART) || '[]');
    products.push({
      productName,
      price,
      quantity: 1,
      total: price
    });
    sessionStorage.setItem(SS_CART, JSON.stringify(products));
  }

  updateProductQuantity(index: number, type: string) {
    const products: IProductCart[] = JSON.parse(sessionStorage.getItem(SS_CART) || '[]');

    if (type === 'up') {
      products[index].quantity += 1;
    }

    if (type === 'down' && products[index].quantity > 1) {
      products[index].quantity -= 1;
    }

    products[index].total = (products[index].quantity * products[index].price);
    sessionStorage.setItem(SS_CART, JSON.stringify(products));
  }

  removeProduct(index: number) {
    const products: IProductCart[] = JSON.parse(sessionStorage.getItem(SS_CART) || '[]');
    products.splice(index, 1);
    sessionStorage.setItem(SS_CART, JSON.stringify(products));
  }

}
