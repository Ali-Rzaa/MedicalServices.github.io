import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctors } from 'src/app/data';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{
  doctor = doctors[0];
  paramId = null
  constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.doctor = doctors.filter(p=>p.id==this.paramId)[0];
  }
}
