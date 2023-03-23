import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clinics, doctors } from 'src/app/data';
import { ClinicModel, DoctorModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-clinic-visit',
  templateUrl: './clinic-visit.component.html',
  styleUrls: ['./clinic-visit.component.scss']
})
export class ClinicVisitComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router: Router, private userService: UserService){}
 clinic: ClinicModel;
 doctors: DoctorModel[];
  ngOnInit(){
    this.loadClinic(this.route.snapshot.params['id']);
    this.loadDoctor(this.route.snapshot.params['id']);
  }
  loadClinic(id:any){
    this.userService.GetClinic(id).subscribe({
      next:(v) => {
        this.clinic = v.data
      },
      error:(error) => {
        console.log('Error in loadClinics: ' + error.message);
      }
  });
  }
  loadDoctor(id:any){
    this.userService.GetClinicDoctor(id).subscribe({
      next:(v) => {
        this.doctors = v.data
      },
      error:(error) => {
        console.log('Error in loadDoctor: ' + error.message);
      }
  });
  }
}
