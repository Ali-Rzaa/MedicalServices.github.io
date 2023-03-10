import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctors } from 'src/app/data';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss']
})
export class DoctorBookingComponent implements OnInit{
  constructor(private route:ActivatedRoute){}
  doctor = doctors[0];
  paramId = null
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.doctor = doctors.filter(p=>p.id==this.paramId)[0];
  }
}
