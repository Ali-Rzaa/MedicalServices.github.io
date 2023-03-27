import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doctors } from 'src/app/data';
import { DoctorModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss'],
})
export class DoctorBookingComponent implements OnInit {
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}
  // doctor = doctors[0];
  selectedDateAndTime = '';
  selectedDay = '';
  doctorId = '';
  doctor: DoctorModel;
  pateintForm!: FormGroup;
  date: any;
  time: any;
  ngOnInit() {
    this.pateintForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      disease: ['', [Validators.required]],
      timming: ['2023-03-23T09:45:22.751Z', [Validators.required]],
      diseaseInPast: ['', [Validators.required]],
    });
    this.loadDoctor(this.route.snapshot.params['id']);
    this.doctorId = this.route.snapshot.params['id'];
    this.selectedDateAndTime = this.route.snapshot.params['selectedDateAndTime'];
    let splitOpeningTime = this.selectedDateAndTime.split('-');
    debugger;
    let substringsplitOpeningTime = splitOpeningTime[2].slice(3, -8);
    let splitOpeningDate = this.selectedDateAndTime.split('T');
    this.date = splitOpeningDate[0];
    this.time = substringsplitOpeningTime;
  }
  EnterSubmit(event: any) {
    this.submitAppointent();
  }
  submitAppointent() {
    if (window.navigator.onLine) {
      this.userService.AppointmentByDoctor(this.doctorId, this.pateintForm.value).subscribe({
        next: (v) => {
          console.log(v.message);
        },
        error: (e) => {
          console.log(e.error.message);
        },
      });
    }
  }
  loadDoctor(id: any) {
    this.userService.GetDoctor(id).subscribe({
      next: (v) => {
        this.doctor = v.data;
      },
      error: (error) => {
        console.log('Error in loadDoctor: ' + error.message);
      },
    });
  }
}
