import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { clinics } from 'src/app/data';
import { DoctorModel, FacilitiesModel, HospitalModel } from 'src/app/models/admin-models';
import { radiologyFacilities } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-hospital-appointment',
  templateUrl: './hospital-appointment.component.html',
  styleUrls: ['./hospital-appointment.component.scss']
})
export class HospitalAppointmentComponent implements OnInit{
  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private userService:UserService){}
  hospital :HospitalModel
  // currentDate = new Date()
  currentDate = '2023-03-22T10:26:17.54'
  radiologyTime:string[] = []
  paramedicalTime:string[] = []
  fee:number = 0
  facilityIds:string[] = []
  doctors :DoctorModel[] = []
  radiology :radiologyFacilities[] = []
  selectedRadiology :radiologyFacilities[] = []
  paramedical : radiologyFacilities[] = []
  selectedParamedical : radiologyFacilities[] = []
  pateintForm!: FormGroup;
  option = ''
  selectedTime:string='';
  
  ngOnInit(){
    this.pateintForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      facilityIds: [[], [Validators.required]],
      timming: [this.currentDate, [Validators.required]],
    });
    this.loadHospital(this.route.snapshot.params['id']);
    if(this.route.snapshot.params['facilityCategory'] !== 'paramedical')
    {
      this.loadRadiology(this.route.snapshot.params['facilityCategory']);
      this.loadRadiologyTime(this.route.snapshot.params['facilityCategory']);
    }
    if(this.route.snapshot.params['facilityCategory'] === 'paramedical')
    {
      this.loadParamedical(this.route.snapshot.params['id']);
      this.loadParamedicalTime(this.route.snapshot.params['id']);
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
  loadRadiologyTime(id:any){
    this.userService.GetHospitalFacilityAvailableTime(id,this.currentDate).subscribe({
      next:(v) => {
        this.radiologyTime = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
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
  loadParamedicalTime(id:any){
    this.userService.GetHospitalParamedicalAvailableTime(id,this.currentDate).subscribe({
      next:(v) => {
        this.paramedicalTime = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
  }
  
  EnterSubmit(event:any){
    this.submitAppointent();
  }
  submitAppointent(){
    this.pateintForm.patchValue({
      facilityIds: this.facilityIds
    });
    if(window.navigator.onLine){
      this.userService.AppointmentByFacilities(this.pateintForm.value).subscribe({
        next:(v)=>{
          console.log(v.message)
          alert(v.message)
        },
        error:(e)=>{
          console.log(e.error.message)
        }
      })
    }
  }
}
