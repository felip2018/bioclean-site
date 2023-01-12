import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductToSave } from '../models/iproducttosave';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(body: {type: string;category_id?: number;product_code?:number;}) {
    return this.http.post(`${environment.api}/get-products`, body);
  }

  updateStatus(body: {id: number; estado: string;}) {
    return this.http.put(`${environment.api}/update-product-status`, body);
  }

  save(body: IProductToSave) {
    return this.http.post(`${environment.api}/save-product`, body);
  }

  update(body: IProductToSave) {
    return this.http.put(`${environment.api}/update-product`, body);
  }
}
