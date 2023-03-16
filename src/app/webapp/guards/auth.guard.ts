import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SS_IS_LOGIN } from '../../webapp/config/storageKeys';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService,
    private router: Router) { }

  canActivate() {
    const isLogin = this.storageService.getItem(SS_IS_LOGIN);
    if (isLogin === '1') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
