import { Component } from '@angular/core';
import { hospitals } from 'src/app/data';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent {
  hospitals = hospitals
}
