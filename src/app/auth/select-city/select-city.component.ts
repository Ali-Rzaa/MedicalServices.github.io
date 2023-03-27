import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/Account/account.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private accountService: AccountService){}
  ngOnInit(): void {
    this.loadCities();
    this.loadUser();
    this.gotoDashboard();
  }
  userName = ""
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
  loadUser(){
    this.userService.GetUserProfile().subscribe({
      next: (vl)=>{
        this.userName = vl.data.firstName + ' ' + vl.data.lastName;
      },
      error:(er)=>{
        console.log('load User error: '+er)
      }
    })
  }
  gotoDashboard() {
    if (this.accountService.isLoggedIn == true) {
      if (this.accountService.getUserType() == 'Admin') {
        // this.router.navigateByUrl('/admin/dashboard');
        this.router.navigateByUrl('/admin/doctors');
      }
      if(this.accountService.getUserCity() !== null)
      {
         if (this.accountService.getUserType() == 'User') {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/signIn');
        }
      }
    } else {
      this.router.navigateByUrl('/signIn');
    }
  }
}
