import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SS_IS_LOGIN, SS_USER_DATA } from '../../../webapp/config/storageKeys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async login() {
    try {
      const response: any = await lastValueFrom(this.authenticationService.loginService(this.loginForm.value));
      this.authenticationService.storage.setItem(SS_IS_LOGIN, '1');
      this.authenticationService.storage.setItem(SS_USER_DATA, JSON.stringify(response.data));
      this.router.navigate(['/webapp/home']);
    } catch (error: any) {
      console.log('something was wrong > ', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.error?.message,
        footer: ''
      })
    }
  }

}
