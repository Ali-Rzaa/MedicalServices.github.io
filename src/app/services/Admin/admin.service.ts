import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RepositoryService } from '../repository.ts/respository.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private router: Router, private repositoryService: RepositoryService) {}

  AddCity(data: any) {
    return this.repositoryService.post('City/add-City?name=' + data, {}, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getCities() {
    return this.repositoryService.get('City/get-Cities', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleCity(id: any) {
    return this.repositoryService.delete('City/delete-City/' + id).pipe(
      map((user: any) => {
        return user;
      })
    );
  } ///api/Hospital/update-hospital/{hospitalId}
  AddHospital(data: any) {
    return this.repositoryService.post('Hospital/add-hospital', data, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  UpdateHospital(hospitalId: any, data: any) {
    debugger;
    return this.repositoryService.putWithOutFile('Hospital/update-hospital/' + hospitalId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getHospitalbyId(hospitalId: any) {
    return this.repositoryService.get('Hospital/get-hospital/' + hospitalId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getHospital() {
    return this.repositoryService.get('Hospital/get-hospitals', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
}
