import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IGeneric } from '../../models/igeneric';
import { FragancesService } from '../../services/fragances.service';

@Component({
  selector: 'app-fragances',
  templateUrl: './fragances.component.html',
  styleUrls: ['./fragances.component.css']
})
export class FragancesComponent implements OnInit {

  showForm: boolean;
  fragancesList: IGeneric[] = [];
  applicationForm: FormGroup;
  isUpdate: boolean;

  constructor(private formBuilder: FormBuilder,
              private fragancesService: FragancesService) {
    this.showForm = false;
    this.isUpdate = false;
    this.applicationForm = this.formBuilder.group({
      id: [0],
      nombre: ['', Validators.required],
      estado: ['Activo'],
    });
  }

  ngOnInit(): void {
    this.getFragances();
  }

  async getFragances() {
    try {
      this.fragancesList = await lastValueFrom(this.fragancesService.getAll());
    } catch (error) {
      console.error(error);
    }
  }

  showRegisterForm(): void {
    this.showForm = !this.showForm;
    if (this.isUpdate) {
      this.showForm = true;
      this.isUpdate = false;
      this.applicationForm.reset();
    }
  }

  async submit() {
    try {
      if (!this.isUpdate){
        await lastValueFrom(this.fragancesService.save(this.applicationForm.value))
      } else {
        await lastValueFrom(this.fragancesService.update(this.applicationForm.value))
        this.isUpdate = false;
      }
      this.applicationForm.reset();
      this.getFragances();
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

  updateFragance(fragance: IGeneric) {
    this.isUpdate = true;
    this.applicationForm.controls['id'].setValue(fragance.id);
    this.applicationForm.controls['nombre'].setValue(fragance.nombre);
    this.applicationForm.controls['estado'].setValue(fragance.estado);
    this.showForm = true;
  }

  async updateStatus(fragance: IGeneric, status: string) {
    fragance.estado = status;
    await lastValueFrom(this.fragancesService.update(fragance));
    this.getFragances();
  }
}
