import { Component } from '@angular/core';
import { doctors, hospitals } from 'src/app/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  doctors = doctors;
  hospitals = hospitals;
}
