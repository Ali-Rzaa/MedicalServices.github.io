import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/Account/account.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.isLoggedIn !== true) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  UserType: any;
  constructor(private accountService: AccountService, private router: Router) {
    this.UserType = this.accountService.getUserType();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.isLoggedIn == true && this.UserType == 'Admin') {
      return true;
    } else {
      this.router.navigate(['/']);
    }
    return true;
  }
}
