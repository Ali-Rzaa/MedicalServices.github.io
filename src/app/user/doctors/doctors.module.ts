import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [DoctorListComponent, DoctorProfileComponent, DoctorBookingComponent],
  imports: [CommonModule, DoctorsRoutingModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
})
export class DoctorsModule {
  constructor() {
    console.log('doctor module');
  }
}
