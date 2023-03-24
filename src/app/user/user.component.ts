import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserModel } from '../models/admin-models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private userService:UserService){}
  city = '';
  user :UserModel;
  public screenWidth :any;
  public screenHeight :any;
  public showSearch = false;
  // public showToggle = false;
  ngOnInit(): void {
    this.loadUser();
    this.city = localStorage.getItem("userCityName")
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }
  loadUser(){
    this.userService.GetUserProfile().subscribe({
      next: (v)=>{
        this.user = v.data;
      },
      error: (e)=>{
      }
    })
  }
 toggle(){
  this.showSearch = !this.showSearch;
 }
}
