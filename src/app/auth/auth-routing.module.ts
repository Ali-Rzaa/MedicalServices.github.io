import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
      // {path:'', canActivate: [!AuthGuard], children:[
      //   {
      //     path: '',
      //     redirectTo: 'signIn',
      //     pathMatch: 'full',
      //   },
        // {path:'', component:SignInComponent},
        {path:'signIn', component:SignInComponent},
        {path:'signUp', component:SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
