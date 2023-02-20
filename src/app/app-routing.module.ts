import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'clinic',loadChildren:()=>import('./user/clinics/clinics.module').then(mod=> mod.ClinicsModule)},
  {path:'doctor',loadChildren:()=>import('./user/doctors/doctors.module').then(mod=> mod.DoctorsModule)},
  {path:'hospital',loadChildren:()=>import('./user/hospitals/hospitals.module').then(mod=> mod.HospitalsModule)},
  {path:'lab',loadChildren:()=>import('./user/labs/labs.module').then(mod=> mod.LabsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
