import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICity } from '../models/icity';
import { ICountry } from '../models/icountry';
import { IDocumentType } from '../models/idocumenttype';
import { IGeneric } from '../models/igeneric';
import { ILocation } from '../models/ilocation';
import { IProfile } from '../models/iprofile';
import { IRegion } from '../models/iregion';
import { IUnit } from '../models/iunit';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getProfiles() {
    return this.http.get<IProfile[]>(`${environment.api}/get-profiles`);
  }

  getDocumentTypes() {
    return this.http.get<IDocumentType[]>(`${environment.api}/get-document-types`);
  }

  getCountries() {
    return this.http.get<ICountry[]>(`${environment.api}/get-countries`);
  }

  getRegionsByCountry(country_id: number) {
    return this.http.get<IRegion[]>(`${environment.api}/get-regions/${country_id}`);
  }

  getCitiesByRegion(region_id: number) {
    return this.http.get<ICity[]>(`${environment.api}/get-cities/${region_id}`);
  }

  getLocationsByCity(ciudad_id: number) {
    return this.http.get<ILocation[]>(`${environment.api}/get-locations/${ciudad_id}`);
  }
}
