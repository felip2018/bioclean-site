import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IUnit } from '../../models/iunit';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  showForm: boolean;
  unitsList: IUnit[] = [];
  applicationForm: FormGroup;
  isUpdate: boolean;

  constructor(private formBuilder: FormBuilder,
              private unitsService: UnitsService) {
    this.showForm = false;
    this.isUpdate = false;
    this.applicationForm = this.formBuilder.group({
      id: [0],
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required],
      estado: ['Activo'],
    });
  }

  ngOnInit(): void {
    this.getUnits();
  }

  async getUnits() {
    try {
      this.unitsList = await lastValueFrom(this.unitsService.getAll());
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
        await lastValueFrom(this.unitsService.save(this.applicationForm.value))
      } else {
        await lastValueFrom(this.unitsService.update(this.applicationForm.value))
        this.isUpdate = false;
      }
      this.applicationForm.reset();
      this.getUnits();
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

  updateUnit(unit: IUnit) {
    this.isUpdate = true;
    this.applicationForm.controls['id'].setValue(unit.id);
    this.applicationForm.controls['nombre'].setValue(unit.nombre);
    this.applicationForm.controls['abreviatura'].setValue(unit.abreviatura);
    this.applicationForm.controls['estado'].setValue(unit.estado);
    this.showForm = true;
  }

  async updateStatus(unit: IUnit, status: string) {
    unit.estado = status;
    await lastValueFrom(this.unitsService.update(unit));
    this.getUnits();
  }
}
