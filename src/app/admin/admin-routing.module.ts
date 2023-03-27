import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard, AuthGuard } from '../auth-guard.guard';
import { AdminComponent } from './admin.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CitiesComponent } from './cities/cities.component';
import { ClinicDetailsComponent } from './clinics/clinic-details/clinic-details.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalDetailsComponent } from './hospitals/hospital-details/hospital-details.component';

import { HospitalsComponent } from './hospitals/hospitals.component';
import { LabDetailsComponent } from './labs/lab-details/lab-details.component';
import { LabsComponent } from './labs/labs.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clinics', component: ClinicsComponent },
      { path: 'clinics/details/:clinicId', component: ClinicDetailsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'hospitals', component: HospitalsComponent },
      { path: 'labs', component: LabsComponent },
      { path: 'labs/details/:labId', component: LabDetailsComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'cities', component: CitiesComponent },
      { path: 'appointments/details/:appoinmentId', component: AppointmentDetailsComponent },
      { path: 'hospitals/details/:hospitalId', component: HospitalDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
