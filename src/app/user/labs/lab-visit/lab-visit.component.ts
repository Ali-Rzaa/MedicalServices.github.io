import { Component } from '@angular/core';
import { hospitals } from 'src/app/data';

@Component({
  selector: 'app-lab-visit',
  templateUrl: './lab-visit.component.html',
  styleUrls: ['./lab-visit.component.scss']
})
export class LabVisitComponent {
  hospital = hospitals[0];
}
