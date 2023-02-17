import { Component } from '@angular/core';
import { hospitals } from 'src/app/data';

@Component({
  selector: 'app-hospital-visit',
  templateUrl: './hospital-visit.component.html',
  styleUrls: ['./hospital-visit.component.scss']
})
export class HospitalVisitComponent {
  hospital = hospitals[0];
}
