import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  dataSource: any;
  columnsToDisplay: string[] = ['image', 'firstName', 'lastName', 'email', 'empty'];
  doctors: Doctor[] = [];
  ngOnInit(): void {
    this.getDoctors();
  }
  getDoctors() {
    this.doctors = [];
    for (let a = 0; a < 10; a++) {
      let doctor: Doctor = {
        image: '',
        name: 'Hire',
        address: 'Khan',
        phoneNo: '',
        openning: '',
      };
      this.doctors.push(doctor);
    }
    this.dataSource = new MatTableDataSource(this.doctors);
  }
}
