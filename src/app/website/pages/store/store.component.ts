import { Component, OnInit } from '@angular/core';
import { SS_CART } from '../../config/ss_keys';
import { IProductCart } from '../../models/iproduct-cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(productName: string, price: number) {
    this.cartService.addToCart(productName, price);
  }

}
