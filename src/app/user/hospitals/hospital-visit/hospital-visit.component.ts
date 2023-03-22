import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { hospitals, doctors } from 'src/app/data';
import { DoctorModel, HospitalModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-hospital-visit',
  templateUrl: './hospital-visit.component.html',
  styleUrls: ['./hospital-visit.component.scss']
})
export class HospitalVisitComponent implements OnInit{
  hospital :HospitalModel;
  doctors :DoctorModel[];
  constructor(private route:ActivatedRoute, private router: Router, private userService: UserService){}
  ngOnInit(){
    this.loadHospital(this.route.snapshot.params['id']);
    this.loadDoctors(this.route.snapshot.params['id']);
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
  loadDoctors(id:any){
    this.userService.GetHospitalDoctor(id).subscribe({
      next:(v) => {
        this.doctors = v.data
      },
      error:(error) => {
        console.log('Error in loadDoctors: ' + error.message);
      }
    });
  }
}
