import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicsRoutingModule } from './clinics-routing.module';
import { ClinicVisitComponent } from './clinic-visit/clinic-visit.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    ClinicVisitComponent,
    ClinicListComponent
  ],
  imports: [
    CommonModule,
    ClinicsRoutingModule,
    MatButtonModule
  ]
})
export class ClinicsModule { }
