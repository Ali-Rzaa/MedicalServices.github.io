import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {

  constructor(private router: Router, private userService: UserService){}
  ngOnInit(): void {
    this.loadCities()
  }
  userName = "Hira Akram"
  selectedCity = 'Select City...'
  cities:Cities[] = []
  showDropdown = false
  cityId: any
  mouseleave(){
    this.showDropdown = false
  }
  selectCtiy(name: string, id:any){
    this.selectedCity = name
    this.cityId = id
  }
  submitCity(){
    localStorage.setItem('userCity',this.cityId);
    localStorage.setItem('userCityName',this.selectedCity);
    this.router.navigateByUrl('/home') 
  }
  loadCities(){
    this.userService.GetCities().subscribe({
      next: (vl)=>{
        this.cities = vl.data
      },
      error:(er)=>{
        console.log('cities error: '+er)
      }
    })
  }
}
