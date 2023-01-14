import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SS_IS_EDIT_KIT, SS_KIT_TO_EDIT } from '../../config/storageKeys';
import { IKit } from '../../models/ikit';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit {

  kits: IKit[];

  constructor(private router: Router,
  private productsService: ProductsService,
  private storageService: StorageService) {
    this.kits = [];
  }

  ngOnInit(): void {
    this.getKits();
  }

  async getKits() {
    try {
      this.kits = await lastValueFrom(this.productsService.getAllKits());
    } catch (err: any) {
      console.error(err);
    }
  }

  showRegisterForm() {
    this.storageService.setItem(SS_IS_EDIT_KIT, 'no');
    this.router.navigate(['webapp/register-kit']);
  }

  async updateStatus(id: number, estado: string) {
    await lastValueFrom(this.productsService.updateKitStatus({id, estado}));
    this.getKits();
  }

  editProduct(id: number) {
    this.storageService.setItem(SS_IS_EDIT_KIT, 'si');
    this.storageService.setItem(SS_KIT_TO_EDIT, `${id}`);
    this.router.navigate(['webapp/register-kit']);
  }
}
