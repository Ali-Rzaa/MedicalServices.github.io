import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicModel, DoctorModel, HospitalModel, LabModel } from 'src/app/models/admin-models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router: Router, private userService: UserService){
  }
  ngOnInit(): void {
    this.loadSearch(this.route.snapshot.params['searchKey']);
  }
  doctors :DoctorModel[];
  hospitals :HospitalModel[];
  labs :LabModel[];
  loadSearch(key:any){
    this.userService.SearchResult(localStorage.getItem('userCity'),key).subscribe({
      next: (v)=> {
        this.doctors = v.data.doctors
        this.hospitals = v.data.hosptials
        this.labs = v.data.labs
      },
      error: (e)=>{

      }
    })
  }
}
