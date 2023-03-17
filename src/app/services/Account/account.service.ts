import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticateModel } from 'src/app/models/authenticate-model';
import { RepositoryService } from '../repository.ts/respository.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private router: Router, private repositoryService: RepositoryService) {}
  //User SignUp
  RegisterUser(authenticateModel: any) {
    return this.repositoryService.post('Account/user-signup', authenticateModel, false).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  RegisterAdmin(authenticateModel: any) {
    return this.repositoryService.post('Account/admin-signup', authenticateModel, false).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  login(authenticateModel: AuthenticateModel) {
    debugger
    return this.repositoryService.post('Account/login', authenticateModel, false).pipe(
      map((user: any) => {
        localStorage.setItem('ca_access_token', user.token);
        localStorage.setItem('user_id', user.userId);
        localStorage.setItem('user_type', user.role);
        return user;
      })
    );
  }
  getToken() {
    return localStorage.getItem('ca_access_token');
  }
  getUserId() {
    return localStorage.getItem('user_id');
  }
  getUserType() {
    return localStorage.getItem('user_type');
  }
  // get isLoggedIn(): boolean {
  //   let authToken = localStorage.getItem('ca_access_token');
  //   return authToken !== null ? true : false;
  // }
  doLogout() {
    let removeToken = localStorage.removeItem('ca_access_token');
    let removeUserID = localStorage.removeItem('user_id');
    let removeUserType = localStorage.removeItem('user_type');
    if (removeToken == null && removeUserID == null && removeUserType == null) {
      this.router.navigate(['/']);
    }
  }
}