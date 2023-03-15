import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CitiesComponent } from './cities/cities.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { LabsComponent } from './labs/labs.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
    {path:'', component:AdminComponent, children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'clinics', component:ClinicsComponent},
      {path:'doctors', component:DoctorsComponent},
      {path:'hospitals', component:HospitalsComponent},
      {path:'labs', component:LabsComponent},
      {path:'patients', component:PatientsComponent},
      {path:'appointments', component:AppointmentsComponent},
      {path:'cities', component:CitiesComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
