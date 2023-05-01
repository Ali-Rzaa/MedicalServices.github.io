import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./user/user.module').then(mod=> mod.UserModule)},
  // {path:'auth', loadChildren:()=>import('./auth/auth.module').then(mod=> mod.AuthModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
