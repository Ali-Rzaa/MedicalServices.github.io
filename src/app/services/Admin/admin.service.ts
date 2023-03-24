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

  getHospitalFacilitiesbyId(typeId: any, hospitalId: any) {
    return this.repositoryService.get('Facility/get-hospital-facility-by-type/' + typeId + '/' + hospitalId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  ///api/Facility/get-lab-facilities/{labId}
  getLabsFacilitiesById(labId: any) {
    return this.repositoryService.get('Facility/get-lab-facilities/' + labId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getRadiologyFacilities(hospitalId: any) {
    return this.repositoryService.get('Facility/get-hospital-radiology-facilities/' + hospitalId, true).pipe(
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
  getDoctorbyClinicId(clinicId: any) {
    return this.repositoryService.get('Doctor/get-doctors-by-clinic/' + clinicId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getClinic() {
    return this.repositoryService.get('Clinic/get-clinics', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddClinic(data: any) {
    return this.repositoryService.postWithFile('Clinic/add-clinic', data).pipe(
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
    return this.repositoryService.put('Clinic/update-clinic/' + clinicId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddClinicImage(clinicId: any, data: any) {
    return this.repositoryService.put('Image/update-clinic-cover-image/' + clinicId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  AddHospitalCoverImage(hospitalId: any, data: any) {
    return this.repositoryService.put('Image/update-hospital-cover-image/' + hospitalId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleFacility(facilityId: any) {
    return this.repositoryService.delete('Facility/delete-facility/' + facilityId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleRadiologyCategory(facilityCategoryId: any) {
    return this.repositoryService.delete('Facility/delete-facilityCategory/' + facilityCategoryId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddFacility(data: any) {
    return this.repositoryService.post('Facility/add-facility', data, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  UpdateParamedicalFacility(facilityId: any, data: any) {
    debugger;
    return this.repositoryService.put('Facility/update-facility/' + facilityId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddRadiologyFacility(hospitalId: any, data: any) {
    return this.repositoryService.post('Facility/add-radiology-facilities-of-hospital/' + hospitalId, data, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  EditRadiologyFacility(facilityId: any, data: any) {
    return this.repositoryService.putWithOutFile('Facility/update-facility/' + facilityId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  EditRadiologyFacilityCategory(facilityCategoryId: any, name: any) {
    return this.repositoryService.putWithOutFile('Facility/update-facilityCategory/' + facilityCategoryId + '?name=' + name, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getAppointments() {
    return this.repositoryService.get('Appointment/get-appointment-list', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  getAppointmentbyId(appointmentId: any) {
    return this.repositoryService.get('Appointment/get-appointment/' + appointmentId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  getLabbyId(labId: any) {
    return this.repositoryService.get('Lab/get-lab/' + labId, true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  AddLab(data: any) {
    return this.repositoryService.postWithFile('Lab/add-lab', data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  getLabs() {
    return this.repositoryService.get('Lab/get-labs', true).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  deteleLab(labId: any) {
    return this.repositoryService.delete('Lab/delete-lab/' + labId).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  AddLabCoverImage(labId: any, data: any) {
    return this.repositoryService.put('Image/update-lab-cover-image/' + labId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  UpdateLab(labId: any, data: any) {
    return this.repositoryService.put('Lab/update-lab/' + labId, data).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
}
