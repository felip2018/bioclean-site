import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IGeneric } from '../../models/igeneric';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  showForm: boolean;
  categoriesList: IGeneric[] = [];
  applicationForm: FormGroup;
  isUpdate: boolean;

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService) {
    this.showForm = false;
    this.isUpdate = false;
    this.applicationForm = this.formBuilder.group({
      id: [0],
      nombre: ['', Validators.required],
      estado: ['Activo'],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories() {
    try {
      this.categoriesList = await lastValueFrom(this.categoriesService.getAll());
    } catch (error) {
      console.error(error);
    }
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
  }

  async submit() {
    try {
      if (!this.isUpdate){
        await lastValueFrom(this.categoriesService.save(this.applicationForm.value))
      } else {
        await lastValueFrom(this.categoriesService.update(this.applicationForm.value))
        this.isUpdate = false;
      }
      this.applicationForm.reset();
      this.getCategories();
    } catch (error: any) {
      console.log('error > ', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.error?.message,
        footer: ''
      })
    }
  }

  updateCategory(category: IGeneric) {
    this.isUpdate = true;
    this.applicationForm.controls['id'].setValue(category.id);
    this.applicationForm.controls['nombre'].setValue(category.nombre);
    this.applicationForm.controls['estado'].setValue(category.estado);
    this.showForm = true;
  }

  async updateStatus(category: IGeneric, status: string) {
    category.estado = status;
    await lastValueFrom(this.categoriesService.update(category));
    this.getCategories();
  }

}
