import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RepositoryService } from '../repository.ts/respository.service';

@Injectable({
  providedIn: 'root',
})
export class MasterTableService {
  constructor(private router: Router, private repositoryService: RepositoryService) {}

  getDoctorTypes() {
    return this.repositoryService.get('Master/get-doctor-types', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getUsers() {
    return this.repositoryService.get('User/get-user-list', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
}
