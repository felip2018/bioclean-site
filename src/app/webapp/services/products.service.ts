import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IKit } from '../models/ikit';
import { IKitToSave } from '../models/ikittosave';
import { IProductToSave } from '../models/iproducttosave';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(body: {type: string;category_id?: number;product_code?:number;}) {
    return this.http.post(`${environment.api}/get-products`, body);
  }

  getAllKits() {
    return this.http.get<IKit[]>(`${environment.api}/get-kits`);
  }

  updateStatus(body: {id: number; estado: string;}) {
    return this.http.put(`${environment.api}/update-product-status`, body);
  }

  updateKitStatus(body: {id: number; estado: string;}) {
    return this.http.put(`${environment.api}/update-kit-status`, body);
  }

  save(body: IProductToSave) {
    return this.http.post(`${environment.api}/save-product`, body);
  }

  update(body: IProductToSave) {
    return this.http.put(`${environment.api}/update-product`, body);
  }

  saveKit(body: IKitToSave) {
    return this.http.post(`${environment.api}/save-kit`, body);
  }

  getKitInfo(id: number) {
    return this.http.get<IKitToSave>(`${environment.api}/get-kit-by-id/${id}`);
  }

  updateKit(body: IKitToSave) {
    return this.http.put(`${environment.api}/update-kit`, body);
  }
}
