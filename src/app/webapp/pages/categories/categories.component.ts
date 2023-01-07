import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  showForm: boolean;
  productTypesList: any[];

  constructor() {
    this.showForm = false;
    this.productTypesList = [
      {id: 1,nombre: 'Hogar',estado: 'Activo'},
      {id: 2,nombre: 'Industrial',estado: 'Activo'},
    ]
  }

  ngOnInit(): void {
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
  }

}
