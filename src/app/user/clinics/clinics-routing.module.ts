import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicVisitComponent } from './clinic-visit/clinic-visit.component';

const routes: Routes = [
  {path: 'user', children:[
    {path:'clinics',component:ClinicListComponent},
    {path:'clinicVisit/:id',component:ClinicVisitComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }
