import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPerson } from '../models/iperson';
import { IProfile } from '../models/iprofile';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  save(body: IPerson) {
    return this.http.post(`${environment.api}/save-user`, body);
  }

  getUsers() {
    return this.http.get<IUser[]>(`${environment.api}/get-users`);
  }

  updateStatus(body: {id: number, estado: string}) {
    return this.http.put(`${environment.api}/update-user-status`, body)
  }
}
