import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { hospitals, doctors } from 'src/app/data';

@Component({
  selector: 'app-hospital-visit',
  templateUrl: './hospital-visit.component.html',
  styleUrls: ['./hospital-visit.component.scss']
})
export class HospitalVisitComponent implements OnInit{
  hospital = hospitals[2];
  doctors = doctors
  paramId = null
  constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.hospital = hospitals.filter(p=>p.id==this.paramId)[0];
  }
}
