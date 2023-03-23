import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalAppointmentComponent } from './hospital-appointment/hospital-appointment.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalVisitComponent } from './hospital-visit/hospital-visit.component';

const routes: Routes = [
    {path:'', component:HospitalListComponent},
    {path:'hospitalVisit/:id', component:HospitalVisitComponent},
    {path:'hospitalAppointment/:id', component:HospitalAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
