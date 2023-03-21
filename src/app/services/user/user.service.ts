import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RepositoryService } from '../repository.ts/respository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private repositoryService: RepositoryService) { }

  GetCities() {
    return this.repositoryService.get('City/get-Cities', true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetCityDoctors(cityId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-city/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetCityHospitals(cityId: any) {
    return this.repositoryService.get('Hospital/get-hospitals/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetCityClinics(cityId: any) {
    return this.repositoryService.get('/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetCityLabs(cityId: any) {
    return this.repositoryService.get('/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
