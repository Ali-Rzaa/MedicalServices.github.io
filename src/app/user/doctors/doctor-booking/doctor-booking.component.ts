import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doctors } from 'src/app/data';
import { DoctorModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss'],
})
export class DoctorBookingComponent implements OnInit {
  selectedDateAndTime = '';
  selectedDay = '';
  doctorId = '';
  doctor: DoctorModel;
  pateintForm!: FormGroup;
  date: any;
  time: any;
  addLoading:boolean = false
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.doctorId = this.route.snapshot.params['id'];
    this.selectedDateAndTime = this.route.snapshot.params['selectedDateAndTime'];
    let splitOpeningTime = this.selectedDateAndTime.split('-');
    let substringsplitOpeningTime = this.selectedDateAndTime.length===22? splitOpeningTime[2].slice(2, -8) : splitOpeningTime[2].slice(3, -8);
    console.log(this.selectedDateAndTime.length)
    let splitOpeningDate = this.selectedDateAndTime.split('T');
    this.date = splitOpeningDate[0];
    this.time = substringsplitOpeningTime;
  }
  ngOnInit() {
    this.pateintForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      disease: ['', [Validators.required]],
      timming: [this.selectedDateAndTime, [Validators.required]],
      diseaseInPast: ['', [Validators.required]],
    });
    this.loadDoctor(this.route.snapshot.params['id']);
  }
  EnterSubmit(event: any) {
    if(this.pateintForm.valid){
      this.submitAppointent();
    }
  }
  submitAppointent() {
    this.addLoading = true
    if (window.navigator.onLine) {
      this.userService.AppointmentByDoctor(this.doctorId, this.pateintForm.value).subscribe({
        next: (v) => {
          Swal.fire('Success!', v.message, 'success');
          this.addLoading = false
        },
        error: (e) => {
          debugger
          this.addLoading = false
          Swal.fire('Opps:', e.error.title, 'error');
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
