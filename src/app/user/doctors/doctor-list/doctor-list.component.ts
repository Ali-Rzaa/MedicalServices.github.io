import { Component } from '@angular/core';
import { doctors } from 'src/app/data';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {
  doctors = doctors;
}
