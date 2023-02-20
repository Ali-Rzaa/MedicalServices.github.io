import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinics, doctors } from 'src/app/data';


@Component({
  selector: 'app-clinic-visit',
  templateUrl: './clinic-visit.component.html',
  styleUrls: ['./clinic-visit.component.scss']
})
export class ClinicVisitComponent implements OnInit {
  constructor(private route:ActivatedRoute){}
  clinic = clinics[0];
  paramId = null
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.clinic = clinics.filter(p=>p.id==this.paramId)[0];
  }
  doctors = doctors;
}
