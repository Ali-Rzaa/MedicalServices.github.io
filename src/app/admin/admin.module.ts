import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { LabsComponent } from './labs/labs.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    HospitalsComponent,
    ClinicsComponent,
    LabsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
