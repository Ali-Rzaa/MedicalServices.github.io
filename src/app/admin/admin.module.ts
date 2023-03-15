import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { LabsComponent } from './labs/labs.component';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CitiesComponent } from './cities/cities.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    HospitalsComponent,
    ClinicsComponent,
    LabsComponent,
    AppointmentsComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
  ]
})
export class AdminModule { 
  constructor(){
    console.log('admin module')
  }
}
