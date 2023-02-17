import { Component } from '@angular/core';
import { doctors } from 'src/app/data';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {
  doctor = doctors[0];
}
