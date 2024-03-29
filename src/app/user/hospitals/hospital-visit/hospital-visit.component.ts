import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorModel, FacilitiesModel, HospitalModel } from 'src/app/models/admin-models';
import { radiologyFacility } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/Account/account.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-hospital-visit',
  templateUrl: './hospital-visit.component.html',
  styleUrls: ['./hospital-visit.component.scss']
})
export class HospitalVisitComponent implements OnInit{
  hospital :HospitalModel;
  doctors :DoctorModel[];
  isLogged: any;
  radiology :radiologyFacility[];
  paramedicals : FacilitiesModel[];
  option = 'paramedical';
  constructor(private accountService: AccountService, private route:ActivatedRoute, private router: Router, private userService: UserService){}
  ngOnInit(){
    this.isLogged = this.accountService.isLoggedIn;
    this.loadHospital(this.route.snapshot.params['id']);
    this.loadDoctors(this.route.snapshot.params['id']);
    this.loadRadiology(this.route.snapshot.params['id']);
    this.loadParamedical(this.route.snapshot.params['id']);
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
  loadParamedical(id:any){
    this.userService.GetFacilitiesByType(2,id).subscribe({
      next:(v) => {
        this.paramedicals = v.data
      },
      error:(error) => {
        console.log('Error in loadParamedical: ' + error.message);
      }
    });
  }
  loadRadiology(id:any){
    this.userService.GetRadiologyFacilities(id).subscribe({
      next:(v) => {
        this.radiology = v.data
      },
      error:(error) => {
        console.log('Error in loadHospital: ' + error.message);
      }
    });
  }
}
