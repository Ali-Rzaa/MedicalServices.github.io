import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.guard';
import { SelectCityComponent } from './select-city/select-city.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
      // {path:'', canActivate: [(!AuthGuard)], component:SignInComponent, children:[
      //   {
      //     path: '',
      //     redirectTo: 'signIn',
      //     pathMatch: 'full',
      //   },
        {path:'', component:SignInComponent},
        {path:'signIn', component:SignInComponent},
        {path:'signUp', component:SignUpComponent},
        {path:'selectCity', component:SelectCityComponent},
      // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
