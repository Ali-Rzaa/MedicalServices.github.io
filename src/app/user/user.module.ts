import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { ClinicsModule } from './clinics/clinics.module';
// import { DoctorsModule } from './doctors/doctors.module';
// import { HospitalsModule } from './hospitals/hospitals.module';
// import { LabsModule } from './labs/labs.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component'


@NgModule({
  declarations: [
    HomeComponent,
    UserProfileComponent,
    UserComponent,
    BookAppointmentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule
  ]
})
export class UserModule { }
