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
export interface FacilitiesModel {
  type: string;
  facilityId: string;
  createdDateTime: string;
  modifiedDateTime: string;
  modifiedBy: string;
  createdBy: string;
  name: string;
  fee: string;
  typeId: number;
  labId: string;
  hospitalId: string;
  isAdded?: boolean;
  facilityCategoryId: string;
}
export interface FacilitiesCategory {
  facilityCategoryId: string;
  facilityCategoryName: string;
  hospitalId: string;
  FacilitiesModel: FacilitiesModel[];
}
export interface AppointmentModel {
  appoinmentId: string;
  fee: number;
  userId: string;
  doctorId: string;
  status: boolean;
  doctorName: string;
  disease: string;
  diseaseInPast: string;
  email: string;
  phoneNo: string;
  gender: string;
  dob: string;
  timming: string;
  patientName: string;
  weight: number;
  day: string;
  onlyTime: string;
  onlyDate: string;
  hospitalName: string;
  clinicName: string;
  labName: string;
}
export interface UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
export interface LabModel {
  image: string;
  coverImage: string;
  labId: string;
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
  uploadImage: string;
  hours: string;
}
