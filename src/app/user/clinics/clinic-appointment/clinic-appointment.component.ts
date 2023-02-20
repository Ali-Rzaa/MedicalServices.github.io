import { Component } from '@angular/core'
import { clinics } from 'src/app/data'

@Component({
  selector: 'app-clinic-appointment',
  templateUrl: './clinic-appointment.component.html',
  styleUrls: ['./clinic-appointment.component.scss']
})
export class ClinicAppointmentComponent {
  clinic = clinics[0]
}
