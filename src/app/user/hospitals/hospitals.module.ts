import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalVisitComponent } from './hospital-visit/hospital-visit.component';
import { MatButtonModule } from '@angular/material/button';
import { HospitalAppointmentComponent } from './hospital-appointment/hospital-appointment.component'


@NgModule({
  declarations: [
    HospitalListComponent,
    HospitalVisitComponent,
    HospitalAppointmentComponent
  ],
  imports: [
    CommonModule,
    HospitalsRoutingModule,
    MatButtonModule
  ]
})
export class HospitalsModule {
  constructor(){
    console.log('hospital module')
  }
 }
