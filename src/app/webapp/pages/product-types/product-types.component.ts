import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css']
})
export class ProductTypesComponent implements OnInit {
  showForm: boolean;
  productTypesList: any[];

  constructor() {
    this.showForm = false;
    this.productTypesList = [
      {id: 1,nombre: 'Alcohol',estado: 'Activo'},
      {id: 2,nombre: 'Ambientador',estado: 'Activo'},
      {id: 3,nombre: 'Bicarbonato',estado: 'Activo'},
      {id: 4,nombre: 'Biojax',estado: 'Activo'},
      {id: 5,nombre: 'Biovarsol',estado: 'Activo'},
      {id: 6,nombre: 'Blanqueador',estado: 'Activo'},
      {id: 7,nombre: 'Cera polimerica',estado: 'Activo'},
      {id: 8,nombre: 'Creolina',estado: 'Activo'},
      {id: 9,nombre: 'Desengrasante',estado: 'Activo'},
      {id: 10,nombre: 'Desodorizador',estado: 'Activo'},
      {id: 11,nombre: 'Detergente liquido lavaloza',estado: 'Activo'},
    ]
  }

  ngOnInit(): void {
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
  }
}
