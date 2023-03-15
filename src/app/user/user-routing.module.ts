import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {path:'', component:UserComponent, children:[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'userProfile', component:UserProfileComponent},
    {path:'clinics',loadChildren:()=>import('./clinics/clinics.module').then(mod=> mod.ClinicsModule)},
    {path:'doctors',loadChildren:()=>import('./doctors/doctors.module').then(mod=> mod.DoctorsModule)},
    {path:'hospitals',loadChildren:()=>import('./hospitals/hospitals.module').then(mod=> mod.HospitalsModule)},
    {path:'labs',loadChildren:()=>import('./labs/labs.module').then(mod=> mod.LabsModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
