import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { city, DoctorModel, FacilitiesCategory, FacilitiesModel, HospitalModel, Type } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { MasterTableService } from 'src/app/services/Admin/master-table.service';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.scss'],
})
export class HospitalDetailsComponent {
  coverImageURL: any[] = [];
  imageURL: any[] = [];
  cities: city[] = [];
  EditHospitalForm!: FormGroup;
  EditDoctorForm!: FormGroup;
  AddDoctorForm!: FormGroup;
  AddRadiologyForm!: FormGroup;
  closeModal: string = '';
  dateErrorMessage: string = '';
  errorMessage: string = '';
  dltErrorMessages: string = '';
  deleteLoading: boolean = false;
  editHospitalLoading: boolean = false;
  coverImageFormData: FormData = new FormData();
  doctorImageFormData: FormData = new FormData();
  hospitalImageFormData: FormData = new FormData();
  hospitalImageURL: any[] = [];
  hospitaiImage: string = '';
  doctors: DoctorModel[] = [];
  _facilities: FacilitiesModel[] = [];
  radiologyFacilities = [];
  radiologyEditFacilities = [];
  _doctorId: string = '';
  doctorIndex: number;
  hospital: HospitalModel = {
    image: '',
    coverImage: '',
    hospitalId: '',
    createdDateTime: '',
    modifiedDateTime: '',
    modifiedBy: '',
    createdBy: '',
    cityName: '',
    name: '',
    address: '',
    phoneNumber: '',
    openingTime: '',
    closingTime: '',
    mon: false,
    tus: false,
    wed: false,
    thur: false,
    fri: false,
    sat: false,
    sun: false,
    cityId: '',
    hours: '',
  };
  hospitalId: string = '';
  shortDate: any;
  types: Type[] = [];
  addLoading: boolean = false;
  TypeId: string = '';
  drImage: string = '';
  doctorId: string = '';
  dataSource: any;
  dataSourceRadiology: any;
  dataSourceEditRadiology: any;
  showAddCancelBtn: number = 0;
  showAddRadiologyCancelBtn: number = 0;
  showEditRadiologyCancelBtn: number = 0;
  facilityId: string = '';
  facilityIndex: number;
  columnsToDisplay: string[] = ['name', 'fee'];
  columnsToDisplayRadiology: string[] = ['name', 'fee'];
  facilityCategories: FacilitiesCategory[] = [];
  facilityCategoryName: string = '';
  editRadioLogyCategoryName: string = '';
  radioCategoryId: string = '';
  constructor(private masterTableService: MasterTableService, private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    const routeParams = this.route.snapshot.paramMap;
    this.hospitalId = routeParams.get('hospitalId');
    let date = new Date();
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this.shortDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this.shortDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
  ngOnInit(): void {
    this.GatHospitalDetails();
    this.getCities();
    this.getDoctorsByHospitalId();
    this.getDoctortypes();
    this.getRadiologyFacilities();
    this.getFacilitiesByParamedical();
  }
  GatHospitalDetails() {
    this.adminService.getHospitalbyId(this.hospitalId).subscribe(
      (dt) => {
        this.hospital = {
          image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
          coverImage: dt.data.coverImage == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.coverImage,
          hospitalId: dt.data.hospitalId,
          createdDateTime: dt.data.createdDateTime,
          modifiedDateTime: dt.data.modifiedDateTime,
          modifiedBy: dt.data.modifiedBy,
          createdBy: dt.data.createdBy,
          cityName: dt.data.cityName,
          name: dt.data.name,
          address: dt.data.address,
          phoneNumber: dt.data.phoneNumber,
          openingTime: dt.data.openingTime,
          closingTime: dt.data.closingTime,
          mon: dt.data.mon,
          tus: dt.data.tus,
          wed: dt.data.wed,
          thur: dt.data.thur,
          fri: dt.data.fri,
          sat: dt.data.sat,
          sun: dt.data.sun,
          cityId: dt.data.cityId,
          hours: this.CalculateHours(new Date(dt.data.closingTime), new Date(dt.data.openingTime)),
        };
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/');
        }
        console.log('Error in GatUserDetails: ' + error.message);
      }
    );
  }
  getDoctorsByHospitalId() {
    this.adminService.getDoctorbyHospital(this.hospitalId).subscribe(
      (dt) => {
        this.doctors = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let status = '';
          if (data[a].availableStatus == true) {
            status = 'Available';
          } else {
            status = 'Not Available';
          }
          let doctor: DoctorModel = {
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : data[a].image,
            doctorId: data[a].doctorId,
            createdDateTime: data[a].createdDateTime,
            modifiedDateTime: data[a].modifiedDateTime,
            modifiedBy: data[a].modifiedBy,
            createdBy: data[a].createdBy,
            name: data[a].name,
            fee: data[a].fee,
            field: data[a].field,
            phoneNumber: data[a].phoneNumber,
            experience: data[a].experience,
            description: data[a].description,
            openingTime: data[a].openingTime,
            closingTime: data[a].closingTime,
            mon: data[a].mon,
            tus: data[a].tus,
            wed: data[a].wed,
            thur: data[a].thur,
            fri: data[a].fri,
            sat: data[a].sat,
            sun: data[a].sun,
            typeId: data[a].typeId,
            hospitalId: data[a].hospitalId,
            clinicId: data[a].clinicId,
            clinicName: data[a].clinicName,
            hospitalName: data[a].hospitalName,
            availableStatus: status,
          };
          this.doctors.push(doctor);
        }
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getDoctors ' + error.message);
      }
    );
  }
  CancelPopUp() {
    this.modalService.dismissAll();
    this.showAddCancelBtn = 0;
    this.showAddRadiologyCancelBtn = 0;
    this.showEditRadiologyCancelBtn = 0;

    this.getRadiologyFacilities();
  }
  getDoctortypes() {
    this.masterTableService.getDoctorTypes().subscribe(
      (dt) => {
        this.types = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let type: Type = {
            id: data[a].id,
            type: data[a].type,
          };
          this.types.push(type);
          this.TypeId = this.types[0].id;
        }
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getDoctortypes ' + error.message);
      }
    );
  }
  AddDoctorModal(Item: any) {
    this.coverImageFormData = new FormData();
    this.doctorImageFormData = new FormData();
    this.hospitalImageFormData = new FormData();
    this.imageURL = [];
    this.AddDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      fee: ['', Validators.required],
      field: ['', Validators.required],
      phoneNumber: [''],
      experience: ['', Validators.required],
      description: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      mon: [false],
      tus: [false],
      wed: [false],
      thur: [false],
      fri: [false],
      sat: [false],
      sun: [false],
      typeId: [this.TypeId],
      hospitalId: [''],
      clinicId: [''],
    });
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  onSubmitAddDoctor() {
    this.errorMessage = '';
    let values = this.AddDoctorForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';

    if (this.AddDoctorForm.valid) {
      this.doctorImageFormData.append('Name', this.AddDoctorForm.get('name').value);
      this.doctorImageFormData.append('Fee', this.AddDoctorForm.get('fee').value);
      this.doctorImageFormData.append('Field', this.AddDoctorForm.get('field').value);
      this.doctorImageFormData.append('Description', this.AddDoctorForm.get('description').value);
      this.doctorImageFormData.append('PhoneNumber', this.AddDoctorForm.get('phoneNumber').value);
      this.doctorImageFormData.append('Experience', this.AddDoctorForm.get('experience').value);
      this.doctorImageFormData.append('OpeningTime', values.openingTime);
      this.doctorImageFormData.append('ClosingTime', values.closingTime);
      this.doctorImageFormData.append('Mon', this.AddDoctorForm.get('mon').value);
      this.doctorImageFormData.append('Tus', this.AddDoctorForm.get('tus').value);
      this.doctorImageFormData.append('Wed', this.AddDoctorForm.get('wed').value);
      this.doctorImageFormData.append('Thur', this.AddDoctorForm.get('thur').value);
      this.doctorImageFormData.append('Fri', this.AddDoctorForm.get('fri').value);
      this.doctorImageFormData.append('Sat', this.AddDoctorForm.get('sat').value);
      this.doctorImageFormData.append('Sun', this.AddDoctorForm.get('sun').value);
      this.doctorImageFormData.append('TypeId', this.AddDoctorForm.get('typeId').value);
      this.doctorImageFormData.append('HospitalId', this.hospitalId);
      this.doctorImageFormData.append('ClinicId', '');
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addLoading = true;
        this.adminService.AddDoctor(this.doctorImageFormData).subscribe(
          (dt) => {
            this.getDoctorsByHospitalId();
            this.doctorImageFormData = new FormData();
            this.imageURL = [];
            this.addLoading = false;
            this.modalService.dismissAll();
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  EditDoctorModal(Item: any, data: any) {
    this.coverImageFormData = new FormData();
    this.doctorImageFormData = new FormData();
    this.hospitalImageFormData = new FormData();
    this.drImage = data.image;
    this.doctorId = data.doctorId;
    this.imageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    let splitOpeningTime = data.openingTime.split('-');
    let substringsplitOpeningTime = splitOpeningTime[2].slice(3, -7);
    let openingTime = substringsplitOpeningTime;

    let splitclosingTime = data.closingTime.split('-');
    let substringsplitclosingTime = splitclosingTime[2].slice(3, -7);
    let closingTime = substringsplitclosingTime;

    this.EditDoctorForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      fee: [data.fee, Validators.required],
      field: [data.field, Validators.required],
      phoneNumber: [data.phoneNumber],
      experience: [data.experience, Validators.required],
      description: [data.description, Validators.required],
      openingTime: [openingTime, Validators.required],
      closingTime: [closingTime, Validators.required],
      mon: [data.mon],
      tus: [data.tus],
      wed: [data.wed],
      thur: [data.thur],
      fri: [data.fri],
      sat: [data.sat],
      sun: [data.sun],
      typeId: [data.typeId],
    });
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  onSubmitEditDoctor() {
    this.errorMessage = '';
    let values = this.EditDoctorForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';
    if (this.EditDoctorForm.valid) {
      this.doctorImageFormData.append('Name', this.EditDoctorForm.get('name').value);
      this.doctorImageFormData.append('Fee', this.EditDoctorForm.get('fee').value);
      this.doctorImageFormData.append('Field', this.EditDoctorForm.get('field').value);
      this.doctorImageFormData.append('Description', this.EditDoctorForm.get('description').value);
      this.doctorImageFormData.append('PhoneNumber', this.EditDoctorForm.get('phoneNumber').value);
      this.doctorImageFormData.append('Experience', this.EditDoctorForm.get('experience').value);
      this.doctorImageFormData.append('OpeningTime', values.openingTime);
      this.doctorImageFormData.append('ClosingTime', values.closingTime);
      this.doctorImageFormData.append('Mon', this.EditDoctorForm.get('mon').value);
      this.doctorImageFormData.append('Tus', this.EditDoctorForm.get('tus').value);
      this.doctorImageFormData.append('Wed', this.EditDoctorForm.get('wed').value);
      this.doctorImageFormData.append('Thur', this.EditDoctorForm.get('thur').value);
      this.doctorImageFormData.append('Fri', this.EditDoctorForm.get('fri').value);
      this.doctorImageFormData.append('Sat', this.EditDoctorForm.get('sat').value);
      this.doctorImageFormData.append('Sun', this.EditDoctorForm.get('sun').value);
      this.doctorImageFormData.append('TypeId', this.EditDoctorForm.get('typeId').value);

      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addLoading = true;
        this.adminService.UpdateDoctor(this.doctorId, this.doctorImageFormData).subscribe(
          (dt) => {
            this.getDoctorsByHospitalId();
            this.doctorImageFormData = new FormData();
            this.imageURL = [];
            this.addLoading = false;
            this.modalService.dismissAll();
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  EditHospitalModal(Item: any) {
    this.coverImageFormData = new FormData();
    this.doctorImageFormData = new FormData();
    this.hospitalImageFormData = new FormData();
    this.hospitaiImage = this.hospital.image;
    this.hospitalImageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    let splitOpeningTime = this.hospital.openingTime.split('-');
    let substringsplitOpeningTime = splitOpeningTime[2].slice(3, -7);
    let openingTime = substringsplitOpeningTime;

    let splitclosingTime = this.hospital.closingTime.split('-');
    let substringsplitclosingTime = splitclosingTime[2].slice(3, -7);
    let closingTime = substringsplitclosingTime;

    this.EditHospitalForm = this.formBuilder.group({
      name: [this.hospital.name, Validators.required],
      address: [this.hospital.address, Validators.required],
      phoneNumber: [this.hospital.phoneNumber, Validators.required],
      openingTime: [openingTime, Validators.required],
      closingTime: [closingTime, Validators.required],
      mon: [this.hospital.mon],
      tus: [this.hospital.tus],
      wed: [this.hospital.wed],
      thur: [this.hospital.thur],
      fri: [this.hospital.fri],
      sat: [this.hospital.sat],
      sun: [this.hospital.sun],
      cityId: [this.hospital.cityId, Validators.required],
    });
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  onSubmitUpdateHospital() {
    this.errorMessage = '';
    let values = this.EditHospitalForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772';

    if (this.EditHospitalForm.valid) {
      this.hospitalImageFormData.append('name', this.EditHospitalForm.get('name').value);
      this.hospitalImageFormData.append('address', this.EditHospitalForm.get('address').value);
      this.hospitalImageFormData.append('phoneNumber', this.EditHospitalForm.get('phoneNumber').value);
      this.hospitalImageFormData.append('openingTime', values.openingTime);
      this.hospitalImageFormData.append('closingTime', values.closingTime);
      this.hospitalImageFormData.append('mon', this.EditHospitalForm.get('mon').value);
      this.hospitalImageFormData.append('tus', this.EditHospitalForm.get('tus').value);
      this.hospitalImageFormData.append('wed', this.EditHospitalForm.get('wed').value);
      this.hospitalImageFormData.append('thur', this.EditHospitalForm.get('thur').value);
      this.hospitalImageFormData.append('fri', this.EditHospitalForm.get('fri').value);
      this.hospitalImageFormData.append('sat', this.EditHospitalForm.get('sat').value);
      this.hospitalImageFormData.append('sun', this.EditHospitalForm.get('sun').value);
      this.hospitalImageFormData.append('cityId', this.EditHospitalForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.editHospitalLoading = true;
        this.adminService.UpdateHospital(this.hospitalId, this.hospitalImageFormData).subscribe(
          (dt) => {
            this.hospital = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
              coverImage: dt.data.coverImage == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.coverImage,
              hospitalId: dt.data.hospitalId,
              createdDateTime: dt.data.createdDateTime,
              modifiedDateTime: dt.data.modifiedDateTime,
              modifiedBy: dt.data.modifiedBy,
              createdBy: dt.data.createdBy,
              cityName: dt.data.cityName,
              name: dt.data.name,
              address: dt.data.address,
              phoneNumber: dt.data.phoneNumber,
              openingTime: dt.data.openingTime,
              closingTime: dt.data.closingTime,
              mon: dt.data.mon,
              tus: dt.data.tus,
              wed: dt.data.wed,
              thur: dt.data.thur,
              fri: dt.data.fri,
              sat: dt.data.sat,
              sun: dt.data.sun,
              cityId: dt.data.cityId,
              hours: this.CalculateHours(new Date(dt.data.closingTime), new Date(dt.data.openingTime)),
            };
            this.hospitalImageFormData = new FormData();
            this.modalService.dismissAll();
            this.editHospitalLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.editHospitalLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  // facilities
  getRadiologyFacilities() {
    this.adminService.getRadiologyFacilities(this.hospitalId).subscribe(
      (dt) => {
        this.facilityCategories = [];
        let data = dt.data;
        for (let b = 0; b < data.length; b++) {
          var facilities: FacilitiesModel[] = [];
          for (let c = 0; c < dt.data[b].radiologyFacilities.length; c++) {
            let facility: FacilitiesModel = {
              type: '',
              facilityId: dt.data[b].radiologyFacilities[c].facilityId,
              createdDateTime: dt.data[b].radiologyFacilities[c].createdDateTime,
              modifiedDateTime: dt.data[b].radiologyFacilities[c].modifiedDateTime,
              modifiedBy: dt.data[b].radiologyFacilities[c].modifiedBy,
              createdBy: dt.data[b].radiologyFacilities[c].createdBy,
              name: dt.data[b].radiologyFacilities[c].name,
              fee: dt.data[b].radiologyFacilities[c].fee,
              typeId: dt.data[b].radiologyFacilities[c].typeId,
              labId: dt.data[b].radiologyFacilities[c].labId,
              hospitalId: dt.data[b].radiologyFacilities[c].hospitalId,
              facilityCategoryId: dt.data[b].radiologyFacilities[c].hospitalId,
              isAdded: true,
              isEdit: false,
            };
            facilities.push(facility);
          }
          var category: FacilitiesCategory = {
            facilityCategoryId: dt.data[b].facilityCategoryId,
            facilityCategoryName: dt.data[b].facilityCategoryName,
            hospitalId: dt.data[b].hospitalId,
            FacilitiesModel: facilities,
            isEdit: false,
          };
          this.facilityCategories.push(category);
        }
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getDoctors ' + error.message);
      }
    );
  }
  getFacilitiesByParamedical() {
    this.adminService.getHospitalFacilitiesbyId(2, this.hospitalId).subscribe(
      (dt) => {
        this._facilities = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let facility: FacilitiesModel = {
            type: dt.data[a].type,
            facilityId: dt.data[a].facilityId,
            createdDateTime: dt.data[a].createdDateTime,
            modifiedDateTime: dt.data[a].modifiedDateTime,
            modifiedBy: dt.data[a].modifiedBy,
            createdBy: dt.data[a].createdBy,
            name: dt.data[a].name,
            fee: dt.data[a].fee,
            typeId: dt.data[a].typeId,
            labId: dt.data[a].labId,
            hospitalId: dt.data[a].hospitalId,
            facilityCategoryId: dt.data[a].hospitalId,
            isAdded: true,
            isSelected: false,
          };
          this._facilities.push(facility);
          this.dataSource = new MatTableDataSource(this._facilities);
        }
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getDoctors ' + error.message);
      }
    );
  }
  InsertFacilityRow() {
    let facility = {
      type: '',
      facilityId: '',
      createdDateTime: '',
      modifiedDateTime: '',
      modifiedBy: '',
      createdBy: '',
      name: '',
      fee: '0',
      typeId: 2,
      labId: null,
      hospitalId: this.hospitalId,
      isAdded: false,
      isSelected: false,
      facilityCategoryId: null,
    };
    this._facilities.splice(this._facilities.length + 1, 0, facility);
    this.dataSource = new MatTableDataSource(this._facilities);
    this.addCancelBtn('add');
  }
  changeIsSelectedFlagInRadiology(data: any) {
    for (let i = 0; i < this._facilities.length; i++) {
      if (this._facilities[i].facilityId == data.facilityId) {
        this._facilities[i].isSelected = true;
      } else {
        this._facilities[i].isSelected = false;
      }
    }
  }
  changeDeSelectedFlagInRadiology(data: any) {
    for (let i = 0; i < this._facilities.length; i++) {
      if (this._facilities[i].facilityId == data.facilityId) {
        this._facilities[i].isSelected = false;
        this.getFacilitiesByParamedical();
      }
    }
  }
  EditParamedicalFacility(facility: any) {
    this.errorMessage = '';
    this.addLoading = true;
    let paramedicalfacility = {
      name: facility.name,
      fee: facility.fee,
    };
    this.adminService.UpdateParamedicalFacility(facility.facilityId, paramedicalfacility).subscribe(
      (dt) => {
        this.changeDeSelectedFlagInRadiology(facility);
        this.showAddRadiologyCancelBtn = 0;
        this.addLoading = false;
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        this.addLoading = false;
        this.errorMessage = error.error.message;
        this.getFacilitiesByParamedical();
      }
    );
  }
  DeletRow(date: any) {
    this.dataSource.data.splice(date, 1);
    this.dataSource._updateChangeSubscription();
    this.addCancelBtn('remove');
  }
  addCancelBtn(type: any) {
    if (type == 'add') {
      this.showAddCancelBtn++;
    } else {
      this.showAddCancelBtn--;
    }
  }
  DeleteFacilityModel(Item: any, data: any, index: any) {
    this.facilityId = data.facilityId;
    this.facilityIndex = index;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteFacility(index: any) {
    this.dltErrorMessages = '';
    if (this.facilityId == '') {
      this.DeletRow(index);
    } else {
      this.deleteLoading = true;
      this.adminService.deteleFacility(this.facilityId).subscribe(
        (dt) => {
          this.facilityId = '';
          this.DeletRow(this.facilityIndex);
          this.showAddCancelBtn = 0;
          this.deleteLoading = false;
          this.modalService.dismissAll();
        },
        (error) => {
          this.deleteLoading = false;
          if (error.status == 401) {
            this.accountService.doLogout();
            this.router.navigateByUrl('/signIn');
          }
          this.deleteLoading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  DeleteFacilityCategoryModel(Item: any, data: any) {
    this.facilityId = data.facilityCategoryId;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteFacilityCategory() {
    this.dltErrorMessages = '';
    this.deleteLoading = true;
    this.adminService.deteleRadiologyCategory(this.facilityId).subscribe(
      (dt) => {
        this.getRadiologyFacilities();
        this.deleteLoading = false;
        this.modalService.dismissAll();
      },
      (error) => {
        this.deleteLoading = false;
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        this.deleteLoading = false;
        this.errorMessage = error.error.message;
      }
    );
  }
  cancelBtn() {
    this.getFacilitiesByParamedical();
    this.showAddCancelBtn = 0;
  }
  onSubmitAddFacility() {
    this.errorMessage = '';
    this.addLoading = true;
    for (let c = 0; c < this._facilities.length; c++) {
      if (this._facilities[c].isAdded == false) {
        this.adminService.AddFacility(this._facilities[c]).subscribe(
          (dt) => {
            this.getFacilitiesByParamedical();
            this.showAddCancelBtn = 0;
            this.addLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  //add radiology
  AddRadiologyModel(Item: any) {
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  InsertRadiologyRow() {
    let facility = {
      name: '',
      fee: 0,
      isAdded: false,
    };
    this.radiologyFacilities.splice(this.radiologyFacilities.length + 1, 0, facility);
    this.dataSourceRadiology = new MatTableDataSource(this.radiologyFacilities);
    this.addCancelRadiologyBtn('add');
  }
  DeletRadiologyRow(date: any) {
    this.dataSourceRadiology.data.splice(date, 1);
    this.dataSourceRadiology._updateChangeSubscription();
    this.addCancelRadiologyBtn('remove');
  }
  addCancelRadiologyBtn(type: any) {
    if (type == 'add') {
      this.showAddRadiologyCancelBtn++;
    } else {
      this.showAddRadiologyCancelBtn--;
    }
  }
  onSubmitAddRadiologyFacility() {
    this.errorMessage = '';
    this.addLoading = true;
    let radiologyfacility = {
      facilityCategoryName: this.facilityCategoryName,
      radiologyFacilities: this.radiologyFacilities,
    };
    this.adminService.AddRadiologyFacility(this.hospitalId, radiologyfacility).subscribe(
      (dt) => {
        this.getRadiologyFacilities();
        this.radiologyFacilities = [];
        this.dataSourceRadiology = new MatTableDataSource(this.radiologyFacilities);
        this.facilityCategoryName = '';
        this.modalService.dismissAll();
        this.showAddRadiologyCancelBtn = 0;
        this.addLoading = false;
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        this.addLoading = false;
        this.errorMessage = error.error.errors.name;
      }
    );
  }
  EditRadiologyModel(Item: any, data: any) {
    this.radioCategoryId = data.facilityCategoryId;
    this.editRadioLogyCategoryName = data.facilityCategoryName;
    this.radiologyEditFacilities = data.FacilitiesModel;
    this.dataSourceEditRadiology = new MatTableDataSource(this.radiologyEditFacilities);
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  changeEditFlagInRadiology() {
    for (let i = 0; i < this.facilityCategories.length; i++) {
      if (this.facilityCategories[i].facilityCategoryId == this.radioCategoryId) {
        this.facilityCategories[i].isEdit = true;
      }
    }
  }
  changeEditFlagInRadiologyFacility(id: any) {
    for (let i = 0; i < this.radiologyEditFacilities.length; i++) {
      if (this.radiologyEditFacilities[i].facilityId == id) {
        this.radiologyEditFacilities[i].isEdit = true;
      }
    }
  }
  InsertEditRadiologyRow() {
    let facility = {
      name: '',
      typeId: 1,
      fee: 0,
      isAdded: false,
      facilityCategoryId: this.radioCategoryId,
      hospitalId: this.hospitalId,
    };
    this.radiologyEditFacilities.splice(this.radiologyEditFacilities.length + 1, 0, facility);
    this.dataSourceEditRadiology = new MatTableDataSource(this.radiologyEditFacilities);
    this.addCancelEditRadiologyBtn('add');
  }
  DeletEditRadiologyRow(date: any) {
    this.dataSourceEditRadiology.data.splice(date, 1);
    this.dataSourceEditRadiology._updateChangeSubscription();
    this.addCancelEditRadiologyBtn('remove');
  }
  addCancelEditRadiologyBtn(type: any) {
    if (type == 'add') {
      this.showEditRadiologyCancelBtn++;
    } else {
      this.showEditRadiologyCancelBtn--;
    }
  }
  onSubmitEditRadiologyFacilityCategory() {
    this.errorMessage = '';
    this.addLoading = true;
    for (let i = 0; i < this.facilityCategories.length; i++) {
      if (this.facilityCategories[i].facilityCategoryId == this.radioCategoryId && this.facilityCategories[i].isEdit == true) {
        this.adminService.EditRadiologyFacilityCategory(this.facilityCategories[i].facilityCategoryId, this.editRadioLogyCategoryName).subscribe(
          (dt) => {
            this.getRadiologyFacilities();
            this.modalService.dismissAll();
            this.showEditRadiologyCancelBtn = 0;
            this.addLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      } else {
        this.modalService.dismissAll();
      }
    }
    this.onSubmitEditRadiologyFacility();
  }
  onSubmitEditRadiologyFacility() {
    this.errorMessage = '';
    this.addLoading = true;
    for (let i = 0; i < this.radiologyEditFacilities.length; i++) {
      if (this.radiologyEditFacilities[i].isEdit == true) {
        let data = {
          name: this.radiologyEditFacilities[i].name,
          fee: this.radiologyEditFacilities[i].fee,
        };
        this.adminService.EditRadiologyFacility(this.radiologyEditFacilities[i].facilityId, data).subscribe(
          (dt) => {
            this.modalService.dismissAll();
            this.showEditRadiologyCancelBtn = 0;
            this.addLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
    this.AddRadiologyFacilityByCategory();
  }

  deleteFacilityById(data: any, index: any) {
    this.dltErrorMessages = '';
    if (data.facilityId == undefined) {
      this.DeletEditRadiologyRow(index);
    } else {
      this.deleteLoading = true;
      this.adminService.deteleFacility(data.facilityId).subscribe(
        (dt) => {
          data.facilityId = '';
          this.DeletEditRadiologyRow(index);
          this.showAddCancelBtn = 0;
          this.deleteLoading = false;
          //this.modalService.dismissAll();
        },
        (error) => {
          this.deleteLoading = false;
          if (error.status == 401) {
            this.accountService.doLogout();
            this.router.navigateByUrl('/signIn');
          }
          this.deleteLoading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  AddRadiologyFacilityByCategory() {
    this.errorMessage = '';
    this.addLoading = true;
    for (let c = 0; c < this.radiologyEditFacilities.length; c++) {
      if (this.radiologyEditFacilities[c].isAdded == false) {
        this.adminService.AddFacility(this.radiologyEditFacilities[c]).subscribe(
          (dt) => {
            this.getRadiologyFacilities();
            this.showAddRadiologyCancelBtn = 0;
            this.addLoading = false;
            this.modalService.dismissAll();
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  //   this.errorMessage = '';
  //   this.addLoading = true;
  //   let radioFacility = [];
  //   for (let i = 0; i < this.radiologyEditFacilities.length; i++) {
  //     if (this.radiologyEditFacilities[i].isAdded == false) {
  //       radioFacility.push(this.radiologyEditFacilities[i]);
  //     }
  //   }
  //   let radiologyfacility = {
  //     facilityCategoryName: this.editRadioLogyCategoryName,
  //     radiologyFacilities: radioFacility,
  //   };
  //   debugger;
  //   this.adminService.AddRadiologyFacility(this.hospitalId, radiologyfacility).subscribe(
  //     (dt) => {
  //       this.getRadiologyFacilities();
  //       this.modalService.dismissAll();
  //       this.showAddRadiologyCancelBtn = 0;
  //       this.addLoading = false;
  //     },
  //     (error) => {
  //       if (error.status == 401) {
  //         this.accountService.doLogout();
  //         this.router.navigateByUrl('/signIn');
  //       }
  //       this.addLoading = false;
  //       this.errorMessage = error.error.errors.name;
  //     }
  //   );
  // }
  ///image upload
  onUpdateDoctorImage(event: any) {
    this.imageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.doctorImageFormData.append('UploadImage', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageURL.push(reader.result);
      };
    }
  }
  onUpdateCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverImageFormData.append('image', file, file.name);
      this.addLoading = true;
      this.adminService.AddHospitalCoverImage(this.hospitalId, this.coverImageFormData).subscribe(
        (data) => {
          this.GatHospitalDetails();
          this.addLoading = false;
        },
        (error) => {
          if (error.status == 401) {
            this.accountService.doLogout();
            this.router.navigateByUrl('/');
          }
          console.log('Error in onUpdateCoverImage: ' + error.message);
        }
      );
    }
  }
  onUpdateHospitalImage(event: any) {
    this.coverImageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.hospitalImageFormData.append('UploadImage', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.hospitalImageURL.push(reader.result);
      };
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  CalculateHours(end: Date, start: Date) {
    var diffMs = end.getTime() - start.getTime(); // milliseconds between start & end
    return this.miliSecondToTime(diffMs);
  }
  miliSecondToTime(s: any) {
    s = s < 0 ? 0 : s;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ' h ' + mins + ' m ';
  }
  getCities() {
    this.adminService.getCities().subscribe(
      (dt) => {
        this.cities = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let city: city = {
            cityId: data[a].cityId,
            name: data[a].name,
            isAdded: true,
            index: a + 1,
          };
          this.cities.push(city);
        }
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getCities: ' + error.message);
      }
    );
  }
  DeleteDoctorModel(Item: any, doctorId: any) {
    this._doctorId = doctorId;
    this.dltErrorMessages = '';
    this.deleteLoading = false;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteDoctor() {
    this.dltErrorMessages = '';
    this.deleteLoading = true;
    this.adminService.deteleDoctor(this._doctorId).subscribe(
      (dt) => {
        this.getDoctorsByHospitalId();
        this.deleteLoading = false;
        this.modalService.dismissAll();
      },
      (error) => {
        this.deleteLoading = false;
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        this.deleteLoading = false;
        this.dltErrorMessages = error.error.message;
      }
    );
  }
}
