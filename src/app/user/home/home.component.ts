import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicModel, DoctorModel, HospitalModel } from 'src/app/models/admin-models';
import { LabModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadDoctors();
    this.loadHospitals();
    this.loadClinics();
    this.loadLabs();
  }
  doctors :DoctorModel[];
  hospitals :HospitalModel[];
  clinics :ClinicModel[];
  labs :LabModel[];
  loadDoctors(){
    this.userService.GetCityDoctors(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.doctors = v.data
      },
      error:(error) => {
        console.log('Error in loadDoctors: ' + error.message);
      }
  });
  }
  loadHospitals(){
    this.userService.GetCityHospitals(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.hospitals = v.data
      },
      error:(error) => {
        console.log('Error in loadHospitals: ' + error.message);
      }
  });
  }
  loadClinics(){
    this.userService.GetCityClinics(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.clinics = v.data
      },
      error:(error) => {
        console.log('Error in loadClinics: ' + error.message);
      }
  });
  }
  loadLabs(){
    this.userService.GetCityLabs(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.labs = v.data
      },
      error:(error) => {
        console.log('Error in loadLabs: ' + error.message);
      }
  });
  }
}
