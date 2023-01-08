import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUnit } from '../models/iunit';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private http: HttpClient) { }

  save(body: IUnit) {
    return this.http.post(`${environment.api}/save-unit`, body);
  }

  update(body: IUnit) {
    return this.http.put(`${environment.api}/update-unit`, body);
  }

  getAll() {
    return this.http.get<IUnit[]>(`${environment.api}/get-units`);
  }
}
