import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, DoctorsComponent, PatientsComponent, HospitalsComponent, ClinicsComponent, LabsComponent, AppointmentsComponent, CitiesComponent],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, AdminRoutingModule, MatIconModule, MatTableModule, MatMenuModule, MatTabsModule],
})
export class AdminModule {
  constructor() {
    console.log('admin module');
  }
}
