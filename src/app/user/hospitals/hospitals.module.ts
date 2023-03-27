import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalVisitComponent } from './hospital-visit/hospital-visit.component';
import { MatButtonModule } from '@angular/material/button';
import { HospitalAppointmentComponent } from './hospital-appointment/hospital-appointment.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    HospitalListComponent,
    HospitalVisitComponent,
    HospitalAppointmentComponent
  ],
  imports: [
    CommonModule,
    HospitalsRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class HospitalsModule {
  constructor(){
    console.log('hospital module')
  }
 }
