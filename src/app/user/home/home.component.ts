import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doctors, hospitals } from 'src/app/data';
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
    this.loadDoctors()
    this.loadHospitals()
  }
  loadDoctors(){
    this.userService.GetCityDoctors(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        console.log(v.data)
      },
      error:(error) => {
        console.log('Error in loadDoctors: ' + error.message);
      }
  });
  }
  loadHospitals(){
    this.userService.GetCityHospitals(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        console.log(v.data)
      },
      error:(error) => {
        console.log('Error in loadHospitals: ' + error.message);
      }
  });
  }
  doctors = doctors;
  hospitals = hospitals;
}
