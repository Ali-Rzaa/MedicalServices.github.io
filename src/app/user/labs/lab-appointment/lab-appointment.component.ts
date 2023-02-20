import { Component } from '@angular/core';
import { clinics} from 'src/app/data';

@Component({
  selector: 'app-lab-appointment',
  templateUrl: './lab-appointment.component.html',
  styleUrls: ['./lab-appointment.component.scss']
})
export class LabAppointmentComponent {
  clinic = clinics[0];

}
