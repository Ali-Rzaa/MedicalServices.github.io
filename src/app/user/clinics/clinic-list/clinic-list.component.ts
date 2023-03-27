import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent implements OnInit{
  city = localStorage.getItem('userCityName')
  constructor(private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadClinics();
  }
  clinics :ClinicModel[];
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
}
