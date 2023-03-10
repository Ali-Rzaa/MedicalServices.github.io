import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './user/home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'userProfile', component:UserProfileComponent},
  {path:'clinic',loadChildren:()=>import('./user/clinics/clinics.module').then(mod=> mod.ClinicsModule)},
  {path:'doctor',loadChildren:()=>import('./user/doctors/doctors.module').then(mod=> mod.DoctorsModule)},
  {path:'hospital',loadChildren:()=>import('./user/hospitals/hospitals.module').then(mod=> mod.HospitalsModule)},
  {path:'lab',loadChildren:()=>import('./user/labs/labs.module').then(mod=> mod.LabsModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(mod=> mod.AdminModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
