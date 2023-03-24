import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorProfileComponent,
    DoctorBookingComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class DoctorsModule {
  constructor(){
    console.log('doctor module')
  }
}
