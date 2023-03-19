import { Component, OnInit } from '@angular/core';
import { doctors, users } from 'src/app/data';
import { AccountService } from 'src/app/services/Account/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(private accountService: AccountService){}
  ngOnInit(): void {
    
  }
  user = users[0];
  doctors = doctors;
  filterUser(user: any[]): any[] {
    return user.filter(p => p.experience > 5)
  }
  
  filterUser2(user: any[]): any[] {
    return user.filter(p => p.experience <= 5)
  }

  logout(){
    console.log("logout")
    this.accountService.doLogout();
  }
}
