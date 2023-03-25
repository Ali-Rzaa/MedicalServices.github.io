export interface Cities {
    cityId: string;
    name: string;
    createdBy: string;
    createdDateTime: string;
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
    uploadImage: null;
  }
  export interface radiologyFacilities{
    facilityId:null;
    createdDateTime: string;
    modifiedDateTime: string;
    modifiedBy: string;
    createdBy: string;
    facilityCategoryId: null;
    name: string;
    fee: null;
    labId: null;
    typeId: string;
    hospitalId: null;
  }
  export interface radiologyFacility {
    facilityCategoryId: null;
    facilityCategoryName: string;
    hospitalId: null;
    radiologyFacilities: radiologyFacilities[]
  }