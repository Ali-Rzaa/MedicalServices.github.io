import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserModel } from '../models/admin-models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userStateModel } from '../NGRX/reducers/user-reducer';
import { AccountService } from '../services/Account/account.service';
import { Cities } from '../models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private route:Router, private accountService: AccountService,private router: Router, private userService:UserService, private store: Store<{userReducer:userStateModel}>){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  searchKey = '';
  city = '';
  selectedCity = ''
  cities:Cities[] = []
  showDropdown = false
  cityId: any
  user :UserModel;
  public loggedIn :any;
  public screenWidth :any;
  public screenHeight :any;
  public showSearch = false;
  ngOnInit(): void {
    this.store.select('userReducer').subscribe(data => {
      this.user = data.user
    })
    this.loggedIn = this.accountService.isLoggedIn
    this.loadUser();
    this.loadCities();
    this.city = localStorage.getItem("userCityName")
    this.selectedCity = localStorage.getItem("userCityName")? localStorage.getItem("userCityName") : 'Select City...';
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }
  searchChange(event:any){
    this.searchKey = event.target.value
  }
  pressedEnter(){
    debugger
    this.route.navigateByUrl('/search/'+this.searchKey)
  }
  loadUser(){
    if(this.loggedIn){
      this.userService.GetUserProfile().subscribe({
        next: (v)=>{
          this.user = v.data;
        },
        error: (e)=>{
        }
      })
    }
  }
  mouseleave(){
    this.showDropdown = false
  }
  selectCtiy(name: string, id:any){
    this.city = name;
    this.selectedCity = name;
    this.cityId = id == 'null'? '' : id;
    this.submitCity();
  }
  submitCity(){
    localStorage.setItem('userCity',this.cityId);
    localStorage.setItem('userCityName',this.selectedCity);
    // this.route.navigateByUrl('/home')
    window.location.reload();
  }
  loadCities(){
    this.userService.GetCities().subscribe({
      next: (vl)=>{
        this.cities = vl.data;
      },
      error:(er)=>{
        console.log('cities error: '+er)
      }
    })
  }
 toggle(){
  this.showSearch = !this.showSearch;
 }
}
