import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicsRoutingModule } from './clinics-routing.module';
import { ClinicVisitComponent } from './clinic-visit/clinic-visit.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ClinicAppointmentComponent } from './clinic-appointment/clinic-appointment.component'


@NgModule({
  declarations: [
    ClinicVisitComponent,
    ClinicListComponent,
    ClinicAppointmentComponent
  ],
  imports: [
    CommonModule,
    ClinicsRoutingModule,
    MatButtonModule
  ]
})
export class ClinicsModule { 
  constructor(){
    console.log('clinic module')
  }
}
