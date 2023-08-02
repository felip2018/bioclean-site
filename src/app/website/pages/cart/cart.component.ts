import { Component, OnInit } from '@angular/core';
import { IProductCart } from '../../models/iproduct-cart';
import { SS_CART } from '../../config/ss_keys';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart: IProductCart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.renderCart();
  }

  renderCart() {
    this.cart = JSON.parse(sessionStorage.getItem(SS_CART) || '[]');
  }

  updateProductQuantity(index: number, type: string) {
    this.cartService.updateProductQuantity(index, type);
    this.renderCart();
  }

  removeProduct(index: number) {
    this.cartService.removeProduct(index);
    this.renderCart();
  }
}
