import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinics } from 'src/app/data';

@Component({
  selector: 'app-clinic-appointment',
  templateUrl: './clinic-appointment.component.html',
  styleUrls: ['./clinic-appointment.component.scss']
})
export class ClinicAppointmentComponent implements OnInit{
  constructor(private route:ActivatedRoute){}
  clinic = clinics[0]
  paramId = null
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.clinic = clinics.filter(p=>p.id==this.paramId)[0];
  }
}
