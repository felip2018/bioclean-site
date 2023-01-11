import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ICity } from '../../models/icity';
import { ICountry } from '../../models/icountry';
import { IDocumentType } from '../../models/idocumenttype';
import { IProfile } from '../../models/iprofile';
import { IRegion } from '../../models/iregion';
import { UsersService } from '../../services/users.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent implements OnInit {

  applicationForm: FormGroup;
  profiles: IProfile[];
  documentTypes: IDocumentType[];
  countries: ICountry[];
  regions: IRegion[];
  cities: ICity[];
  showLoader: boolean;

  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService,
    private utilsService: UtilsService) {
    this.profiles = [];
    this.documentTypes = [];
    this.countries = [];
    this.regions = [];
    this.cities = [];
    this.showLoader = false;
    this.applicationForm = this.formBuilder.group({
      tipo_documento_id: ['', Validators.required],
      numero_documento: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      correo_electronico: ['', Validators.required],
      telefono: ['', Validators.required],
      country_id: [''],
      region_id: [''],
      ciudad_id: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      barrio: ['', Validators.required],
      perfil_id: ['', Validators.required],
      comision: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.utilsService.getProfiles()),
        lastValueFrom(this.utilsService.getDocumentTypes()),
        lastValueFrom(this.utilsService.getCountries())
      ]);
      this.profiles = result[0];
      this.documentTypes = result[1];
      this.countries = result[2];
    } catch (err) {
      console.error(err);
    }
  }

  async searchRegions() {
    const countryId = this.applicationForm.controls['country_id'].value;
    if (countryId !== '') {
      try {
        this.regions = await lastValueFrom(this.utilsService.getRegionsByCountry(countryId));
      } catch (err) {
        console.error(err);
      }
    }
  }

  async searchCities() {
    const regionId = this.applicationForm.controls['region_id'].value;
    if (regionId !== '') {
      try {
        this.cities = await lastValueFrom(this.utilsService.getCitiesByRegion(regionId));
      } catch (err) {
        console.error(err);
      }
    }
  }

  validateCommission() {
    const perfilId = this.applicationForm.controls['perfil_id'].value;
    if (perfilId !== '2') {
      this.applicationForm.controls['comision'].setValue('0');
    } else {
      this.applicationForm.controls['comision'].setValue('');
    }
  }

  async submit() {
    this.showLoader = true;
    const formData = this.applicationForm.value;
    console.log('form data > ', formData);
    try {
      const response: any = await lastValueFrom(this.usersService.save(formData));
      console.log('response > ', response);
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: response?.message || 'Se ha realizado el registro de forma exitosa',
        footer: ''
      });
      this.applicationForm.reset();
      this.showLoader = false;
    } catch (error: any) {
      console.log('error > ', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.error?.message,
        footer: ''
      });
      this.showLoader = false;
    }
  }

}
