import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : undefined;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
