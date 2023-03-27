import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { clinics} from 'src/app/data';
import { FacilitiesModel } from 'src/app/models/admin-models';
import { LabModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-appointment',
  templateUrl: './lab-appointment.component.html',
  styleUrls: ['./lab-appointment.component.scss']
})
export class LabAppointmentComponent implements OnInit{
  fee:number = 0
  lab :LabModel;
  labId = ''
  pateintForm!: FormGroup;
  currentDate = new Date()
  availableTime: string[] = [];
  labFacilities:FacilitiesModel[] = [];
  selectedLabFacilities:FacilitiesModel[] = [];
  facilityIds:string[] = []
  selectedDateAndTime = '';
  selectedDay = '';
  date: any;
  time: any;
  addLoading:boolean = false
  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UserService){
    this.labId = this.route.snapshot.params['id'];
    this.selectedDateAndTime = this.route.snapshot.params['selectedDateAndTime'];
    let splitOpeningTime = this.selectedDateAndTime.split('-');
    let substringsplitOpeningTime = this.selectedDateAndTime.length===22? splitOpeningTime[2].slice(2, -8) : splitOpeningTime[2].slice(3, -8);
    console.log(this.selectedDateAndTime.length)
    let splitOpeningDate = this.selectedDateAndTime.split('T');
    this.date = splitOpeningDate[0];
    this.time = substringsplitOpeningTime;
  }
  clinic = clinics[0];
  suggestions = [
    {id:0, name:'Blood Test'},
    {id:1, name:'Basic metabolic panel'},
    {id:2, name:'Hemoglobin A1C'},
    {id:3, name:'Lipid profile'},
    {id:4, name:'Pathology'},
    {id:5, name:'Complete blood count'},
    {id:6, name:'Urinalysis'},
  ]
  selectedSuggestion = [{id:0, name:'Blood Test'},]
  selectSuggestion(obj: any){
      if(this.selectedLabFacilities.length!==0)
      {
        if(this.selectedLabFacilities.find((item)=>item.facilityId === obj.facilityId )){

        }else{
          this.selectedLabFacilities.push(obj);
          this.facilityIds.push(obj.facilityId);
          this.pateintForm.patchValue({
            facilityIds: this.facilityIds
          });
          this.fee += obj.fee;
        }
      }
      if(this.selectedLabFacilities.length===0) {
       this.selectedLabFacilities.push(obj)
       this.facilityIds.push(obj.facilityId);
       this.pateintForm.patchValue({
         facilityIds: this.facilityIds
       });
       this.fee += obj.fee;
     }
  }
  removeSuggestion(obj: any){
    if(this.selectedLabFacilities.length!==0){
        this.fee -= obj.fee
        this.facilityIds = this.facilityIds.filter((item:any)=>item !== obj.facilityId)
        this.pateintForm.patchValue({
          facilityIds: this.facilityIds
        });
      this.selectedLabFacilities = this.selectedLabFacilities.filter((item:any)=>item.facilityId !== obj.facilityId)
    }
  }
  // selectSuggestion(obj: any){
  //   if(this.selectedSuggestion.find((item)=>item.id !== obj.id))
  //   {
  //     this.selectedSuggestion.push(obj)
  //   }
  // }
  // removeSuggestion(id: any){
  //   this.selectedSuggestion = this.selectedSuggestion.filter((item:any)=>item.id !== id)
  // }
  ngOnInit(){
    this.pateintForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      facilityIds: [[], [Validators.required]],
      timming: [this.selectedDateAndTime, [Validators.required]],
    });
    this.loadLab(this.route.snapshot.params['id']);
    this.loadFacilities(this.route.snapshot.params['id']);
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
  EnterSubmit(event:any){
    this.submitAppointent();
  }
  submitAppointent(){
    this.pateintForm.patchValue({
      facilityIds: this.facilityIds
    });
    this.addLoading = true
    if(window.navigator.onLine){
      this.userService.AppointmentByFacilities(this.pateintForm.value).subscribe({
        next:(v)=>{
          this.addLoading = false
          Swal.fire('Success!', v.message, 'success');
        },
        error:(e)=>{
          this.addLoading = false
          Swal.fire('Opps:', e.error? e.error.title : e.message, 'error');
        }
      })
    }
  }

}
