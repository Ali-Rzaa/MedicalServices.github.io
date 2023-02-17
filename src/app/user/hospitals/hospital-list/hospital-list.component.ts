import { Component } from '@angular/core';
import { hospitals } from 'src/app/data';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent {
  hospitals = hospitals;
}
