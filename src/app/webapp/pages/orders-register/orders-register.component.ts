import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SS_CUSTOMER_INFO } from '../../config/storageKeys';
import { ICity } from '../../models/icity';
import { ICountry } from '../../models/icountry';
import { IDocumentType } from '../../models/idocumenttype';
import { ILocation } from '../../models/ilocation';
import { IOrderToSave } from '../../models/iordertosave';
import { IRegion } from '../../models/iregion';
import { OrdersService } from '../../services/orders.service';
import { StorageService } from '../../services/storage.service';
import { UsersService } from '../../services/users.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-orders-register',
  templateUrl: './orders-register.component.html',
  styleUrls: ['./orders-register.component.css']
})
export class OrdersRegisterComponent implements OnInit {
  tipoDocumento: string;
  numeroDocumento: string;
  customerDocument: number = 0;
  applicationForm: FormGroup;
  showLoader = false;
  isEdit = false;
  countries: ICountry[];
  regions: IRegion[];
  cities: ICity[];
  locations: ILocation[];
  documentTypes: IDocumentType[];
  selectedCountry: number = 0;
  selectedRegion: number = 0;
  selectedCity: number = 0;
  productsList: [];

  constructor(private formBuilder: FormBuilder,
  private utilsService: UtilsService,
  private usersService: UsersService,
  private storageService: StorageService,
  private router: Router) {
    this.tipoDocumento = '';
    this.numeroDocumento = '';
    this.countries = [];
    this.regions = [];
    this.cities = [];
    this.locations = [];
    this.showLoader = false;
    this.documentTypes = [];
    this.productsList = [];
    this.applicationForm = this.formBuilder.group({
      tipo_documento_id: ['', Validators.required],
      numero_documento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo_electronico: [''],
      telefono: ['', Validators.required],
      pais_id: [''],
      region_id: [''],
      ciudad_id: ['', Validators.required],
      localidad_id: [''],
      direccion: ['', Validators.required],
      barrio: ['', Validators.required],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.getLists();
    this.populateForm();
  }

  formatText(field: string) {
    const value = this.applicationForm.controls[field].value;
    this.applicationForm.controls[field].setValue(value ? (value as string).toUpperCase() : '');
  }

  async getLists() {
    try {
      const result = await Promise.all([
        lastValueFrom(this.utilsService.getCountries()),
        lastValueFrom(this.utilsService.getDocumentTypes()),
      ]);
      this.countries = result[0];
      this.documentTypes = result[1];
    } catch (err) {
      console.error(err);
    }
  }

  async searchRegions() {
    this.selectedCountry = this.applicationForm.controls['pais_id'].value;
    if (this.selectedCountry !== 0) {
      try {
        this.regions = await lastValueFrom(this.utilsService.getRegionsByCountry(this.selectedCountry));
      } catch (err) {
        console.error(err);
      }
    }
  }

  async searchCities() {
    this.selectedRegion = this.applicationForm.controls['region_id'].value;
    if (this.selectedRegion !== 0) {
      try {
        this.cities = await lastValueFrom(this.utilsService.getCitiesByRegion(this.selectedRegion));
      } catch (err) {
        console.error(err);
      }
    }
  }

  async searchLocations() {
    this.selectedCity = this.applicationForm.controls['ciudad_id'].value;
    if (this.selectedCity !== 0) {
      try {
        this.locations = await lastValueFrom(this.utilsService.getLocationsByCity(this.selectedCity));
      } catch (err) {
        console.error(err);
      }
    }
  }

  async searchCustomer() {
    console.log(`Buscar cliente Tipo (${this.tipoDocumento}) Número (${this.numeroDocumento})`);
    if (this.tipoDocumento && this.numeroDocumento) {
      try {
        const customer:any = await lastValueFrom(this.usersService.getPersonByDocument({
          tipo_documento_id: Number(this.tipoDocumento),
          numero_documento: Number(this.numeroDocumento)
        }));
        console.log('customer data > ', customer.data);
        const {
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          id
        } = customer.data;
        const data = {
          id,
          nombres: `${primer_nombre} ${segundo_nombre}`,
          apellidos: `${primer_apellido} ${segundo_apellido}`,
          ...customer.data
        }
        this.storageService.setItem(SS_CUSTOMER_INFO, JSON.stringify(data));
        this.populateForm();
      } catch (error) {
        console.log('error');
      }
    }
  }

  populateForm() {
    const info = JSON.parse(this.storageService.getItem(SS_CUSTOMER_INFO) || '{}');
    if (info) {
      this.applicationForm.controls['tipo_documento_id'].setValue(info.tipo_documento_id);
      this.applicationForm.controls['numero_documento'].setValue(info.numero_documento);
      this.applicationForm.controls['nombres'].setValue(info.nombres);
      this.formatText('nombres');
      this.applicationForm.controls['apellidos'].setValue(info.apellidos);
      this.formatText('apellidos');
      this.applicationForm.controls['correo_electronico'].setValue(info.correo_electronico);
      this.formatText('correo_electronico');
      this.applicationForm.controls['telefono'].setValue(info.telefono);
      this.applicationForm.controls['pais_id'].setValue(info.pais_id);
      this.searchRegions();
      this.applicationForm.controls['region_id'].setValue(info.region_id);
      this.searchCities();
      this.applicationForm.controls['ciudad_id'].setValue(info.ciudad_id);
      this.searchLocations();
      this.applicationForm.controls['localidad_id'].setValue(info.localidad_id);
      this.applicationForm.controls['direccion'].setValue(info.direccion);
      this.formatText('direccion');
      this.applicationForm.controls['barrio'].setValue(info.barrio);
      this.formatText('barrio');
      this.applicationForm.controls['id'].setValue((info.id) ? info.id : '');
    }
  }

  async submit() {
    this.showLoader = true;
    this.storageService.setItem(SS_CUSTOMER_INFO, JSON.stringify(this.applicationForm.value));
    this.router.navigate(['webapp/register-order-products']);
  }
}
