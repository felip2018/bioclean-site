import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ICity } from '../../models/icity';
import { ICountry } from '../../models/icountry';
import { IDocumentType } from '../../models/idocumenttype';
import { IProfile } from '../../models/iprofile';
import { IRegion } from '../../models/iregion';
import { IUser } from '../../models/iuser';
import { UsersService } from '../../services/users.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  usersList: IUser[];
  hasCommission: boolean;
  showLoader: boolean;
  profiles: IProfile[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private utilsService: UtilsService) {
    this.profiles = [];
    this.users = [];
    this.usersList = [];
    this.hasCommission = false;
    this.showLoader = false;
  }

  ngOnInit(): void {
    this.getProfiles();
    this.getUsers();
  }

  async getProfiles() {
    try {
      this.profiles = await lastValueFrom(this.utilsService.getProfiles());
    } catch (err) {
      console.error(err);
    }
  }

  async getUsers() {
    try {
      this.users = await lastValueFrom(this.usersService.getUsers());
      this.usersList = this.users;
    } catch (err) {
      console.error(err);
    }
  }

  filterUsers(perfil_id: number) {
    if (perfil_id === 0) {
      this.usersList = this.users;
    } else {
      this.usersList = this.users.filter((element) => {
        return element.perfil_id === perfil_id;
      });
    }
  }

  editUser(user_id: number) {
    console.log(`Editar usuario id: ${user_id}`);
  }

  async updateStatus(id: number, estado: string) {
    await lastValueFrom(this.usersService.updateStatus({id, estado}));
    this.getUsers();
  }


  showRegisterForm() {
    console.log('users.showRegisterForm()');

  }
}
