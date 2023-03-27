import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableModel, FacilitiesModel } from 'src/app/models/admin-models';
import { LabModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-lab-visit',
  templateUrl: './lab-visit.component.html',
  styleUrls: ['./lab-visit.component.scss']
})
export class LabVisitComponent implements OnInit {

  lab :LabModel;
  date = '2023-03-27T08:12:07.66'
  availableTime: string[] = [];
  labFacilities:FacilitiesModel[] = [];
  addLoading:boolean = false
  selectedTime:string='';
  count: number = 0;
  _selectedDate: any;
  labId: any;
  facilityId: any;
  minDate = new Date();
  appointmentMsg: string = '';
  bookingDateTime: string = '';
  selected: Date | null;
  AvailableTime: AvailableModel[] = [];
  constructor(private route:ActivatedRoute, private router: Router, private userService: UserService){}
  ngOnInit(){
    this.labId = this.route.snapshot.params['id']
    this.loadLab(this.route.snapshot.params['id']);
    this.loadFacilities(this.route.snapshot.params['id']);
    // this.loadAvailableTime(this.route.snapshot.params['id']);
  }
  loadLab(id:any){
    this.userService.GetLab(id).subscribe({
      next:(v) => {
        this.lab = v.data
      },
      error:(error) => {
        console.log('Error in loadLab: ' + error.message);
      }
    });
  }
  loadFacilities(id:any){
    this.userService.GetLabFacilities(id).subscribe({
      next:(v) => {
        this.labFacilities = v.data
      },
      error:(error) => {
        console.log('Error in loadLab: ' + error.message);
      }
    });
  }
  appointmentButton() {
    if (this._selectedDate != '' && this.selectedTime != '') {
      return 'visit-button';
    } else {
      return 'disable-button';
    }
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
    if(splittedTime[0] >'10'){
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
      return this.lab.sun;
    } else if (day == 1) {
      return this.lab.mon;
    } else if (day == 2) {
      return this.lab.tus;
    } else if (day == 3) {
      return this.lab.wed;
    } else if (day == 4) {
      return this.lab.thur;
    } else if (day == 5) {
      return this.lab.fri;
    } else if (day == 6) {
      return this.lab.sat;
    } else {
      return false;
    }

    // 1 means monday, 0 means sunday, etc.
  };
  // loadAvailableTime(id:any){
  //   this.userService.GetLabAvailableTime(id, this.date).subscribe({
  //     next:(v) => {
  //       this.availableTime = v.data
  //     },
  //     error:(error) => {
  //       console.log('Error in loadLab: ' + error.message);
  //     }
  //   });
  // }
  loadAvailableTime(date: any){
    this.count = 1;
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this._selectedDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this._selectedDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    this.userService.GetLabAvailableTime(this.labId,this._selectedDate).subscribe({
      next:(v) => {
        // this.radiologyTime = v.data
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
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
  }
}
