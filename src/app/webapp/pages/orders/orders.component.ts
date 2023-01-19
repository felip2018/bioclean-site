import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IOrder } from '../../models/iorder';
import { OrdersService } from '../../services/orders.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[];

  constructor(private router: Router,
  private ordersService: OrdersService,
  private storageService: StorageService) {
    this.orders = [];
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    const result = await Promise.all([
      lastValueFrom(this.ordersService.getAll({type: 'all'}))
    ]);
    this.orders = result[0];
  }

  showRegisterForm() {
    this.router.navigate(['webapp/register-order-client']);
  }

  async updateStatus(id: number, estado: string) {
    await lastValueFrom(this.ordersService.updateStatus({id, estado}));
    this.getLists();
  }

  editOrder(id: number) {
    console.log(`Order id: ${id}`);
  }
}
