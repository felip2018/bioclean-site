import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private router: Router,
    private ordersService: OrdersService,
    private storageService: StorageService) { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.router.navigate(['webapp/register-product']);
  }
}
