import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit{
  city = localStorage.getItem('userCityName')
  constructor(private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadClinics();
  }
  hospitals :HospitalModel[];
  loadClinics(){
    this.userService.GetCityHospitals(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.hospitals = v.data
      },
      error:(error) => {
        console.log('Error in loadClinics: ' + error.message);
      }
  });
  }
}
