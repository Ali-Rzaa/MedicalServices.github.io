import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabAppointmentComponent } from './lab-appointment/lab-appointment.component';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabVisitComponent } from './lab-visit/lab-visit.component';

const routes: Routes = [
    {path:'', component:LabListComponent},
    {path:'labVisit/:id', component:LabVisitComponent},
    {path:'labAppointment/:id/:selectedDateAndTime', component:LabAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
