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
