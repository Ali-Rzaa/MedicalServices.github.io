import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'clinic',loadChildren:()=>import('./clinics/clinics.module').then(mod=> mod.ClinicsModule)},
  {path:'doctor',loadChildren:()=>import('./doctors/doctors.module').then(mod=> mod.DoctorsModule)},
  {path:'hospital',loadChildren:()=>import('./hospitals/hospitals.module').then(mod=> mod.HospitalsModule)},
  {path:'lab',loadChildren:()=>import('./labs/labs.module').then(mod=> mod.LabsModule)},
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'userProfile', component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
