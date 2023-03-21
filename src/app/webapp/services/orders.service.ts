import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetOrders } from '../models/igetorders';
import { IOrderToSave } from '../models/iordertosave';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  save(body: IOrderToSave) {
    return this.http.post(`${environment.api}/save-order`, body);
  }

  update(body: IOrderToSave) {
    return this.http.put(`${environment.api}/update-order`, body);
  }

  getAll(body: {filterBy: string; value: string | number}) {
    return this.http.post<IGetOrders[]>(`${environment.api}/get-orders`, body);
  }

  updateStatus(body: {id: number, estado: string}) {
    return this.http.put(`${environment.api}/update-order-status`, body)
  }
}
