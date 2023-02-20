import { Component } from '@angular/core';
import { doctors, users } from 'src/app/data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = users[0];
  doctors = doctors;
  filterUser(user: any[]): any[] {
    return user.filter(p => p.experience > 5)
  }
  
  filterUser2(user: any[]): any[] {
    return user.filter(p => p.experience <= 5)
  }
}
