import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinics } from 'src/app/data';
import { DoctorModel, HospitalModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-hospital-appointment',
  templateUrl: './hospital-appointment.component.html',
  styleUrls: ['./hospital-appointment.component.scss']
})
export class HospitalAppointmentComponent implements OnInit{
  constructor(private route:ActivatedRoute, private userService:UserService){}
  hospital :HospitalModel
  doctors :DoctorModel[]
  radiology :DoctorModel
  paramedical = ''
  option = ''
  selectedTime:string='';
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
    if(this.selectedSuggestion.find((item)=>item.id !== obj.id))
    {
      this.selectedSuggestion.push(obj)
    }
  }
  removeSuggestion(id: any){
    this.selectedSuggestion = this.selectedSuggestion.filter((item:any)=>item.id !== id)
  }
  ngOnInit(){
    this.loadHospital(this.route.snapshot.params['id']);
    // this.loadDoctor(this.route.snapshot.params['id']);
    // this.loadRadiology(this.route.snapshot.params['id']);
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
}
