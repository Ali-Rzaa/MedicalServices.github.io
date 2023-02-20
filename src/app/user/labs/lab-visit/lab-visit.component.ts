import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clinics} from 'src/app/data';

@Component({
  selector: 'app-lab-visit',
  templateUrl: './lab-visit.component.html',
  styleUrls: ['./lab-visit.component.scss']
})
export class LabVisitComponent implements OnInit {
  clinic = clinics[0];
  paramId = null
  constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.paramId = this.route.snapshot.params['id'];
    this.clinic = clinics.filter(p=>p.id==this.paramId)[0];
  }
}
