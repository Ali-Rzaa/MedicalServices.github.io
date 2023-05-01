import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabVisitComponent } from './lab-visit/lab-visit.component';
import { MatButtonModule } from '@angular/material/button';
import { LabAppointmentComponent } from './lab-appointment/lab-appointment.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LabsModule { 
 
}
