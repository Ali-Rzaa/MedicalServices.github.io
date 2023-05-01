import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableModel, DoctorModel, FacilitiesModel, HospitalModel } from 'src/app/models/admin-models';
import { radiologyFacilities } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-appointment',
  templateUrl: './hospital-appointment.component.html',
  styleUrls: ['./hospital-appointment.component.scss']
})
export class HospitalAppointmentComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router, private formBuilder: FormBuilder, private userService:UserService){}
  hospital :HospitalModel
  addLoading:boolean = false
  radiologyTime:string[] = []
  paramedicalTime:string[] = []
  fee:number = 0
  facilityIds:string[] = []
  doctors :DoctorModel[] = []
  AvailableTime: AvailableModel[] = [];
  radiology :radiologyFacilities[] = []
  selectedRadiology :radiologyFacilities[] = []
  paramedical : radiologyFacilities[] = []
  selectedParamedical : radiologyFacilities[] = []
  pateintForm!: FormGroup;
  option = ''
  selectedTime:string='';
  count: number = 0;
  _selectedDate: any;
  time: any;
  hospitalId: any;
  facilityId: any;
  minDate = new Date();
  appointmentMsg: string = '';
  bookingDateTime: string = '';
  selected: Date | null;
  
  ngOnInit(){
    this.hospitalId = this.route.snapshot.params['id'];
    this.facilityId = this.route.snapshot.params['facilityCategory'];
    this.pateintForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      facilityIds: [[null], [Validators.required]],
      timming: ['', [Validators.required]],
    });
    this.loadHospital(this.route.snapshot.params['id']);
    if(this.route.snapshot.params['facilityCategory'] !== 'paramedical')
    {
      this.loadRadiology(this.route.snapshot.params['facilityCategory']);
    }
    if(this.route.snapshot.params['facilityCategory'] === 'paramedical')
    {
      this.loadParamedical(this.route.snapshot.params['id']);
    }
  }
  selectSuggestion(obj: any){
    if(this.radiology.length!==0){
      if(this.selectedRadiology.length!==0)
      {
        if(this.selectedRadiology.find((item)=>item.facilityId === obj.facilityId )){

        }else{
          this.selectedRadiology.push(obj);
          this.facilityIds.push(obj.facilityId);
          this.fee += obj.fee;
        }
      }
      if(this.selectedRadiology.length===0) {
       this.selectedRadiology.push(obj)
       this.facilityIds.push(obj.facilityId);
       this.fee += obj.fee;
     }
    }
    if(this.paramedical.length!==0){
      if(this.selectedParamedical.length!==0)
      {
        if(this.selectedParamedical.find((item)=>item.facilityId === obj.facilityId))
        {
        }else{
          this.selectedParamedical.push(obj);
          this.facilityIds.push(obj.facilityId);
          this.fee += obj.fee;
        }
      }else {
        this.selectedParamedical.push(obj);
        this.facilityIds.push(obj.facilityId);
        this.fee += obj.fee;
      }
    }
  }
  removeSuggestion(obj: any){
    if(this.selectedParamedical.length!==0){
        this.fee -= obj.fee
        this.facilityIds = this.facilityIds.filter((item:any)=>item !== obj.facilityId)
      this.selectedParamedical = this.selectedParamedical.filter((item:any)=>item.facilityId !== obj.facilityId)
    }
    if(this.selectedRadiology.length!==0){
        this.fee -= obj.fee
        this.facilityIds = this.facilityIds.filter((item:any)=>item !== obj.facilityId)
      this.selectedRadiology = this.selectedRadiology.filter((item:any)=>item.facilityId !== obj.facilityId)
    }
  }
  loadHospital(id:any){
    this.userService.GetHospital(id).subscribe({
      next:(v) => {
        this.hospital = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
  }
  loadRadiology(id:any){
    this.userService.GetFacilitiesByCategory(id).subscribe({
      next:(v) => {
        this.radiology = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
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
      this.pateintForm.patchValue({
        timming: this._selectedDate + 'T' + '0' + this.selectedTime + ':00.772Z'
      });
      this.bookingDateTime = this._selectedDate + 'T' + '0' + this.selectedTime + ':00.772Z';
      this.time = '0' + this.selectedTime;
    } else {
      this.pateintForm.patchValue({
        timming: this._selectedDate + 'T' + this.selectedTime + ':00.772Z'
      });
      this.bookingDateTime = this._selectedDate + 'T' + this.selectedTime + ':00.772Z';
      this.time = this.selectedTime;
    }
  }
  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    if (day == 0) {
      return this.hospital.sun;
    } else if (day == 1) {
      return this.hospital.mon;
    } else if (day == 2) {
      return this.hospital.tus;
    } else if (day == 3) {
      return this.hospital.wed;
    } else if (day == 4) {
      return this.hospital.thur;
    } else if (day == 5) {
      return this.hospital.fri;
    } else if (day == 6) {
      return this.hospital.sat;
    } else {
      return false;
    }

    // 1 means monday, 0 means sunday, etc.
  };
  loadAvailableTime(date: any){
    this.count = 1;
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this._selectedDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this._selectedDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    if(this.facilityId === 'paramedical')
    {
      this.userService.GetHospitalParamedicalAvailableTime(this.hospitalId,this._selectedDate).subscribe({
        next:(v) => {
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
    } else {
      this.userService.GetHospitalFacilityAvailableTime(this.facilityId,this._selectedDate).subscribe({
        next:(v) => {
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
  loadParamedical(id:any){
    this.userService.GetFacilitiesByType(2,id).subscribe({
      next:(v) => {
        this.paramedical = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
  }
  EnterSubmit(event:any){
    this.pateintForm.reset();
    if(this.pateintForm.valid){
      this.submitAppointent();
    }
  }
  submitAppointent(){
    this.addLoading = true
    this.pateintForm.patchValue({
      facilityIds: this.facilityIds
    });
    if(window.navigator.onLine){
      this.userService.AppointmentByFacilities(this.pateintForm.value).subscribe({
        next:(v)=>{
          this.addLoading = false
          setTimeout(()=>{
            Swal.fire('Success!', v.message, 'success'); 
          },1000);
          setTimeout(()=>{
            window.location.reload ();
          },3000);
        },
        error:(e)=>{
          this.addLoading = false
          debugger
          Swal.fire('Opps:', e.error?e.error.title : e.message, 'error');
        }
      })
    }
  }
}
