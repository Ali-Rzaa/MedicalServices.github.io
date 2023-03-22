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
  //Doctors
  GetCityDoctors(cityId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-city/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetDoctor(doctorId: any) {
    return this.repositoryService.get('Doctor/get-doctor/' + doctorId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetClinicDoctor(clinicId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-clinic/' + clinicId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetHospitalDoctor(hospitalId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-hospatial/' + hospitalId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetDoctorAvailableTime(doctorId: any) {
    return this.repositoryService.get('Doctor/get-doctors-available-time/' + doctorId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Hospitals
  GetCityHospitals(cityId: any) {
    return this.repositoryService.get('Hospital/get-hospitals/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetHospital(hospitalId: any) {
    return this.repositoryService.get('Hospital/get-hospital/' + hospitalId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Clinics
  GetCityClinics(cityId: any) {
    return this.repositoryService.get('Clinic/get-clinics/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetClinic(clinicId: any) {
    return this.repositoryService.get('Clinic/get-clinic/' + clinicId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Labs
  GetCityLabs(cityId: any) {
    return this.repositoryService.get('Lab/get-labs/' + cityId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetLab(labId: any) {
    return this.repositoryService.get('Lab/get-lab/' + labId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
