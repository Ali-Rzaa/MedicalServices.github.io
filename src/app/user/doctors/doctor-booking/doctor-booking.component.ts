import { Component } from '@angular/core';
import { doctors } from 'src/app/data';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss']
})
export class DoctorBookingComponent {

  doctor = doctors[0];
}
