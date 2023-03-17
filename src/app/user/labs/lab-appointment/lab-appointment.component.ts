import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinics} from 'src/app/data';

@Component({
  selector: 'app-lab-appointment',
  templateUrl: './lab-appointment.component.html',
  styleUrls: ['./lab-appointment.component.scss']
})
export class LabAppointmentComponent implements OnInit{
  constructor(private route:ActivatedRoute){}
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
    if(this.selectedSuggestion.find((item)=>item.id !== obj.id))
    {
      this.selectedSuggestion.push(obj)
    }
  }
  removeSuggestion(id: any){
    this.selectedSuggestion = this.selectedSuggestion.filter((item:any)=>item.id !== id)
  }
  paramId = null
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.clinic = clinics.filter(p=>p.id==this.paramId)[0];
  }

}
