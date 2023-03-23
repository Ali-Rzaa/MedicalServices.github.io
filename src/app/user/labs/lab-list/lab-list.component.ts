import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hospitals } from 'src/app/data';
import { LabModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent implements OnInit{
  constructor(private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadLabs();
  }
  labs :LabModel[];
  loadLabs(){
    this.userService.GetCityLabs(localStorage.getItem('userCity')).subscribe({
      next:(v) => {
        this.labs = v.data
      },
      error:(error) => {
        console.log('Error in loadClinics: ' + error.message);
      }
  });
  }
}
