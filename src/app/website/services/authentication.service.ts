import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILogin } from '../models/ilogin';
import { StorageService } from 'src/app/webapp/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    readonly storage: StorageService) { }

  loginService(body: ILogin) {
    return this.http.post(`${environment.api}/login`, body);
  }
}
