import { Component } from '@angular/core';
import { hospitals, doctors } from 'src/app/data';

@Component({
  selector: 'app-hospital-visit',
  templateUrl: './hospital-visit.component.html',
  styleUrls: ['./hospital-visit.component.scss']
})
export class HospitalVisitComponent {
  hospital = hospitals[2];
  doctor = doctors[2]
}
