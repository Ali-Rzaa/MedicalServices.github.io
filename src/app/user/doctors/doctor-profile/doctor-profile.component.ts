import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  doctor :DoctorModel;
  availabilty :string[];
  selectedDate:string='';
  selectedTime:string='';
  constructor(private route:ActivatedRoute,private router: Router, private userService: UserService){}
  ngOnInit(){
    this.loadDoctor(this.route.snapshot.params['id']);
    this.loadDoctorAvailablity(this.route.snapshot.params['id']);
  }
  appointmentButton(){
    if(this.selectedDate!='' && this.selectedTime != '')
    {
      return 'visit-button'
    } else {
      return 'disable-button'
    }
  }
  loadDoctor(id:any){
    this.userService.GetDoctor(id).subscribe({
      next:(v) => {
        this.doctor = v.data
        this.selectedDate = v.data.openingTime;
      },
      error:(error) => {
        console.log('Error in loadDoctor: ' + error.message);
      }
    });
  }
  loadDoctorAvailablity(id:any){
    this.userService.GetDoctorAvailableTime(id).subscribe({
      next:(v) => {
        this.availabilty = v.data
      },
      error:(error) => {
        console.log('Error in loadDoctorAvailablity: ' + error.message);
      }
    });
  }
}
