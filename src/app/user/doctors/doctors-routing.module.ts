import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

const routes: Routes = [
    {path:'doctors', component:DoctorListComponent},
    {path:'doctorBooking/:id', component:DoctorBookingComponent},
    {path:'doctorProfile/:id', component:DoctorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
