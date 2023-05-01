import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableModel, DoctorModel } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent implements OnInit {
  doctor: DoctorModel;
  isLogged: any;
  availabilty: string[];
  AvailableTime: AvailableModel[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  selected: Date | null;
  bookingDateTime: string = '';
  doctorId: any;
  _selectedDate: any;
  count: number = 0;
  minDate = new Date();
  appointmentMsg: string = '';
  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.isLogged = this.accountService.isLoggedIn;
    this.loadDoctor(this.route.snapshot.params['id']);
    this.doctorId = this.route.snapshot.params['id'];
  }
  appointmentButton() {
    if (this.selectedDate != '' && this.selectedTime != '') {
      return 'visit-button';
    } else {
      return 'disable-button';
    }
  }
  loadDoctor(id: any) {
    this.userService.GetDoctor(id).subscribe({
      next: (v) => {
        this.doctor = v.data;
        this.selectedDate = v.data.openingTime;
      },
      error: (error) => {
        console.log('Error in loadDoctor: ' + error.message);
      },
    });
  }

  getAppointmentDateTime(data: any) {
    for (let i = 0; i < this.AvailableTime.length; i++) {
      if (this.AvailableTime[i].index == data.index) {
        this.AvailableTime[i].bgColor = '#EFFCFA';
        this.AvailableTime[i].border = '2px solid #179C8C';
      } else {
        this.AvailableTime[i].bgColor = '';
        this.AvailableTime[i].border = '2px solid #E0E0E0';
      }
    }
    this.selectedTime = data.time;
    let splittedTime = this.selectedTime.split(':')
    if(parseInt(splittedTime[0]) < 10){
      this.bookingDateTime = this._selectedDate + 'T' + '0' + this.selectedTime + ':00.772Z';
    } else {
      this.bookingDateTime = this._selectedDate + 'T' + this.selectedTime + ':00.772Z';
    }
  }
  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    if (day == 0) {
      return this.doctor.sun;
    } else if (day == 1) {
      return this.doctor.mon;
    } else if (day == 2) {
      return this.doctor.tus;
    } else if (day == 3) {
      return this.doctor.wed;
    } else if (day == 4) {
      return this.doctor.thur;
    } else if (day == 5) {
      return this.doctor.fri;
    } else if (day == 6) {
      return this.doctor.sat;
    } else {
      return false;
    }

    // 1 means monday, 0 means sunday, etc.
  };
  getDoctorAvailablity(date: any) {
    this.count = 1;
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this._selectedDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this._selectedDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    this.userService.GetDoctorAvailableTime(this.doctorId, this._selectedDate).subscribe({
      next: (v) => {
        if (v.data.length == 0) {
          this.appointmentMsg;
        } else {
          this.appointmentMsg = 'Opps: Oppointment is not available on this date.';
        }

        this.AvailableTime = [];
        for (let a = 0; a < v.data.length; a++) {
          let time: AvailableModel = {
            time: v.data[a],
            bgColor: '',
            index: a,
            border: '',
          };
          this.AvailableTime.push(time);
        }
      },
      error: (error) => {
        console.log('Error in loadDoctorAvailablity: ' + error.message);
      },
    });
  }
}
