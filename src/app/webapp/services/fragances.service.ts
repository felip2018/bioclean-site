import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGeneric } from '../models/igeneric';

@Injectable({
  providedIn: 'root'
})
export class FragancesService {

  constructor(private http: HttpClient) { }

  save(body: IGeneric) {
    return this.http.post(`${environment.api}/save-fragance`, body);
  }

  update(body: IGeneric) {
    return this.http.put(`${environment.api}/update-fragance`, body);
  }

  getAll() {
    return this.http.get<IGeneric[]>(`${environment.api}/get-fragances`);
  }
}
