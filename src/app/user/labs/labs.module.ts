import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabVisitComponent } from './lab-visit/lab-visit.component';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    LabListComponent,
    LabVisitComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    MatButtonModule
  ]
})
export class LabsModule { }
