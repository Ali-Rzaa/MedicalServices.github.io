export interface Doctor {
  image: string;
  name: string;
  address: string;
  phoneNo: string;
  openning: string;
}
export interface city {
  cityId: string;
  name: string;
  isAdded: boolean;
  index: number;
}
export interface HospitalModel {
  image: string;
  coverImage: string;
  hospitalId: string;
  createdDateTime: string;
  modifiedDateTime: string;
  modifiedBy: string;
  createdBy: string;
  cityName: string;
  name: string;
  address: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  mon: boolean;
  tus: boolean;
  wed: boolean;
  thur: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  cityId: string;
  hours: string;
}
export interface DoctorModel {
  doctorId: string;
  image: string;
  createdDateTime: string;
  modifiedDateTime: string;
  modifiedBy: string;
  createdBy: string;
  name: string;
  fee: string;
  field: string;
  phoneNumber: string;
  experience: string;
  description: string;
  openingTime: string;
  closingTime: string;
  mon: boolean;
  tus: boolean;
  wed: boolean;
  thur: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  typeId: number;
  hospitalId: string;
  clinicId: string;
  clinicName: string;
  hospitalName: string;
  availableStatus: string;
}
export interface Type {
  id: string;
  type: string;
}
export interface ClinicModel {
  image: string;
  coverImage: string;
  clinicId: string;
  createdDateTime: string;
  modifiedDateTime: string;
  modifiedBy: string;
  createdBy: string;
  cityName: string;
  name: string;
  address: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  mon: boolean;
  tus: boolean;
  wed: boolean;
  thur: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  cityId: string;
  hours: string;
}
