import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGeneric } from '../models/igeneric';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {

  constructor(private http: HttpClient) { }

  save(body: IGeneric) {
    return this.http.post(`${environment.api}/save-product-type`, body);
  }

  update(body: IGeneric) {
    return this.http.put(`${environment.api}/update-product-type`, body);
  }

  getAll() {
    return this.http.get<IGeneric[]>(`${environment.api}/get-product-types`);
  }
}
