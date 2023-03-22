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
  }
  //hospitals
  AddHospital(data: any) {
    return this.repositoryService.postWithFile('Hospital/add-hospital', data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  UpdateHospital(hospitalId: any, data: any) {
    return this.repositoryService.put('Hospital/update-hospital/' + hospitalId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  ///api/Facility/get-hospital-facility-by-type/{typeId}/{hospitalId}
  getHospitalFacilitiesbyId(typeId: any, hospitalId: any) {
    return this.repositoryService.get('Facility/get-hospital-facility-by-type/' + typeId + '/' + hospitalId, true).pipe(
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
  deteleHospital(hospitalId: any) {
    return this.repositoryService.delete('Hospital/delete-hospital/' + hospitalId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddDoctor(data: any) {
    return this.repositoryService.postWithFile('Doctor/add-doctor', data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  UpdateDoctor(doctorId: any, data: any) {
    return this.repositoryService.put('Doctor/update-doctor/' + doctorId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getDoctor() {
    return this.repositoryService.get('Doctor/get-doctor-list', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleDoctor(doctorId: any) {
    return this.repositoryService.delete('Doctor/delete-doctor/' + doctorId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getDoctorbyHospital(hospitalId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-hospatial/' + hospitalId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  //clinic
  getClinic() {
    return this.repositoryService.get('Clinic/get-clinics', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddClinic(data: any) {
    return this.repositoryService.post('Clinic/add-clinic', data, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleClinic(clinicId: any) {
    return this.repositoryService.delete('Clinic/delete-clinic/' + clinicId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getClinicbyId(clinicId: any) {
    return this.repositoryService.get('Clinic/get-clinic/' + clinicId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  UpdateClinic(clinicId: any, data: any) {
    return this.repositoryService.putWithOutFile('Clinic/update-clinic/' + clinicId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  //Facilities
  deteleFacility(facilityId: any) {
    return this.repositoryService.delete('Facility/delete-facility/' + facilityId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddFacility(data: any) {
    debugger;
    return this.repositoryService.post('Facility/add-facility', data, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  //Appointment

  getAppointments() {
    return this.repositoryService.get('Appointment/get-appointment-list', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
}
