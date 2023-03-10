import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicsComponent } from './clinics/clinics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { LabsComponent } from './labs/labs.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
    {path:'dashboard', component:DashboardComponent},
    {path:'clinics', component:ClinicsComponent},
    {path:'doctors', component:DoctorsComponent},
    {path:'hospitals', component:HospitalsComponent},
    {path:'labs', component:LabsComponent},
    {path:'patients', component:PatientsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
