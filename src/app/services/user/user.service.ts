import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RepositoryService } from '../repository.ts/respository.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private repositoryService: RepositoryService) {}

  GetCities() {
    return this.repositoryService.get('City/get-Cities', true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  SearchResult(cityId: any, searchKey: any) {
    return this.repositoryService.get('Search/search-hospital-lab-clinic-doctor/' + cityId + '?searchKey=' + searchKey, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //User Profile
  GetUserProfile() {
    return this.repositoryService.get('User/get-user-profile', true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  UpdateUserProfile(data: any) {
    return this.repositoryService.put('User/update-user-profile', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Doctors
  
  GetCityDoctors(cityId: any) {
    return this.repositoryService.get(`Doctor/get-doctors-by-city${cityId? '?cityId=' + cityId : ''}`, true).pipe(
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
  GetDoctorAvailableTime(doctorId: any, time: any) {
    return this.repositoryService.get('Doctor/get-doctors-available-time/' + doctorId + '?date=' + time, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Hospitals
  GetCityHospitals(cityId: any) {
    return this.repositoryService.get(`Hospital/get-hospitals-by-city${cityId? '?cityId=' + cityId : ''}`, true).pipe(
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
  GetHospitalParamedicalAvailableTime(hospitalId: any, date: any) {
    return this.repositoryService.get('Hospital/get-paramedical-department-available-time/' + hospitalId + '?date=' + date, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetHospitalFacilityAvailableTime(facilityCategoryId: any, date: any) {
    return this.repositoryService.get('Hospital/get-radiology-department-available-time/' + facilityCategoryId + '?date=' + date, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Clinics
  GetCityClinics(cityId: any) {
    return this.repositoryService.get(`Clinic/get-clinics-by-city${cityId? '?cityId=' + cityId : ''}`, true).pipe(
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
    return this.repositoryService.get(`Lab/get-labs-by-city${cityId? '?cityId=' + cityId : ''}`, true).pipe(
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
  GetLabAvailableTime(labId: any, date:any) {
    return this.repositoryService.get('Lab/get-lab-available-time/' + labId + '?date=' + date, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Appointments
  AppointmentByDoctor(doctorId: any, data: any) {
    return this.repositoryService.post('Appointment/book-appointment-by-doctor/' + doctorId, data, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  AppointmentByFacilities(data: any) {
    return this.repositoryService.post('Appointment/book-appointment-by-facilities', data, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetUserAppointment() {
    return this.repositoryService.get('Appointment/get-user-appointments', true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  CancelUserAppointment(id: any) {
    return this.repositoryService.put('Appointment/cancel-appointment/' + id, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  //Facilities
  GetRadiologyFacilities(hospitalId: any) {
    return this.repositoryService.get('Facility/get-hospital-radiology-facilities/' + hospitalId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetFacilitiesByType(typeId: any, hospitalId: any) {
    return this.repositoryService.get('Facility/get-hospital-facility-by-type/' + typeId + '/' + hospitalId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetFacilitiesByCategory(facilityCategoryId: any) {
    return this.repositoryService.get('Facility/get-facilities-by-facilityCategory/' + facilityCategoryId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  GetLabFacilities(labId: any) {
    return this.repositoryService.get('Facility/get-lab-facilities/' + labId, true).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
