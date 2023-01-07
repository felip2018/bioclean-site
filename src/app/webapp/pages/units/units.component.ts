import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  showForm: boolean;
  unitsList: any[];

  constructor() {
    this.showForm = false;
    this.unitsList = [
      {
        id: 1,
        nombre: 'Litro',
        abreviatura: 'lt',
        estado: 'Activo'
      },
      {
        id: 2,
        nombre: 'Galón',
        abreviatura: 'gl',
        estado: 'Activo'
      },
      {
        id: 3,
        nombre: 'Garrafa',
        abreviatura: 'gfa',
        estado: 'Activo'
      },
    ]
  }

  ngOnInit(): void {
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
  }
}
