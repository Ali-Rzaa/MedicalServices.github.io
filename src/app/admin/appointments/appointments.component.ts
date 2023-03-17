import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  dataSource: any;
  columnsToDisplay: string[] = ['Pname', 'gender', 'dateOfBirth', 'phoneNo', 'disease', 'doctorName', 'weight'];
  doctors: Doctor[] = [];
  ngOnInit(): void {
    this.getDoctors();
  }
  getDoctors() {
    this.doctors = [];
    for (let a = 0; a < 10; a++) {
      let doctor: Doctor = {
        image: '',
        name: '',
        address: '',
        phoneNo: '',
        openning: '',
      };
      this.doctors.push(doctor);
    }
    this.dataSource = new MatTableDataSource(this.doctors);
  }
}
