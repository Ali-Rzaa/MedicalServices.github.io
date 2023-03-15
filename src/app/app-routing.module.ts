import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './user/home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./auth/auth.module').then(mod=> mod.AuthModule)},
  {path:'user',loadChildren:()=>import('./user/user.module').then(mod=> mod.UserModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(mod=> mod.AdminModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
