import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UserComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule
  ]
})
export class UserModule { 
  constructor(){
    console.log('user module')
  }
}
