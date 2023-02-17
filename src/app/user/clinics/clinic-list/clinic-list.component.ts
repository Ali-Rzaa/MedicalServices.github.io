import { Component } from '@angular/core';
import { hospitals } from 'src/app/data';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent {
  hospitals = hospitals
}
