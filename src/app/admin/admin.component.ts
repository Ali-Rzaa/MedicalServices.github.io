import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/Account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  activityStatus = 0;
  constructor(private route: ActivatedRoute, public router: Router, private accountService: AccountService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  public Logout() {
    debugger;
    this.accountService.doLogout();
    this.router.navigateByUrl('/signIn');
  }
}
