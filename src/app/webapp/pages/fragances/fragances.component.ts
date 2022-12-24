import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fragances',
  templateUrl: './fragances.component.html',
  styleUrls: ['./fragances.component.css']
})
export class FragancesComponent implements OnInit {

  fragancesList: any[];

  constructor() {
    this.fragancesList = [
      {
        id: 1,
        nombre: 'Manzana',
        estado: 'Activo'
      },
      {
        id: 2,
        nombre: 'Limón',
        estado: 'Activo'
      },
      {
        id: 3,
        nombre: 'Naranja',
        estado: 'Activo'
      },
    ]
  }

  ngOnInit(): void {
  }

  showRegisterForm(): void {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }
}
