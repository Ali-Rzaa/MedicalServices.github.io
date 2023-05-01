import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit{
  city = localStorage.getItem('userCityName')
  constructor(private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadDoctors();
  }
  doctors :DoctorModel[];
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
}
