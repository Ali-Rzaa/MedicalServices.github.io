import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabVisitComponent } from './lab-visit/lab-visit.component';

const routes: Routes = [
  {path:'user', children:[
    {path:'labs', component:LabListComponent},
    {path:'labVisit/:id', component:LabVisitComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
