import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabVisitComponent } from './lab-visit/lab-visit.component';
import { MatButtonModule } from '@angular/material/button';
import { LabAppointmentComponent } from './lab-appointment/lab-appointment.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LabListComponent,
    LabVisitComponent,
    LabAppointmentComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class LabsModule { 
  constructor(){
    console.log('lab module')
  }
}
