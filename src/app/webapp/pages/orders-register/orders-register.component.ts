import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ICity } from '../../models/icity';
import { ICountry } from '../../models/icountry';
import { IDocumentType } from '../../models/idocumenttype';
import { ILocation } from '../../models/ilocation';
import { IOrderToSave } from '../../models/iordertosave';
import { IRegion } from '../../models/iregion';
import { OrdersService } from '../../services/orders.service';
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
  private ordersService: OrdersService,
  private utilsService: UtilsService) {
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
      persona_id: ['']
    });
  }

  ngOnInit(): void {
    this.getLists();
  }

  formatText(field: string) {
    const value = this.applicationForm.controls[field].value;
    this.applicationForm.controls[field].setValue((value as string).toUpperCase());
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
  }

  async submit() {
    this.showLoader = true;
    const body: IOrderToSave = {
      ...this.applicationForm.value
    };
    try {
      let response: any;
      if (this.isEdit) {
        response = await lastValueFrom(this.ordersService.update(body));
      } else {
        response = await lastValueFrom(this.ordersService.save(body));
        this.applicationForm.reset();
      }

      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: response?.message || 'Se ha realizado el registro de forma exitosa',
        footer: ''
      });
      this.showLoader = false;
    } catch (err: any) {
      console.log('error > ', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.error?.message,
        footer: ''
      });
      this.showLoader = false;
    }
  }
}
