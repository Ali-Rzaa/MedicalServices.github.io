import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { city, FacilitiesModel, LabModel } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { MasterTableService } from 'src/app/services/Admin/master-table.service';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.scss'],
})
export class LabDetailsComponent {
  coverImageURL: any[] = [];
  labImageURL: any[] = [];
  labFacilities: FacilitiesModel[] = [];
  lab: LabModel = {
    image: '',
    coverImage: '',
    labId: '',
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
    uploadImage: '',
    hours: '',
  };
  cities: city[] = [];
  EditLabForm!: FormGroup;
  closeModal: string = '';
  coverImageFormData: FormData = new FormData();
  labImageFormData: FormData = new FormData();
  labId: any;
  shortDate: any;
  addLoading: boolean = false;
  labImage: string = '';
  dateErrorMessage: string = '';
  errorMessage: string = '';
  Loading: boolean = false;
  columnsToDisplay: string[] = ['name', 'fee'];
  showAddCancelBtn: number = 0;
  dataSource: any;
  facilityId: string = '';
  facilityIndex: number;
  deleteLoading: boolean = false;
  dltErrorMessages: string = '';
  cityId: any;
  constructor(private masterTableService: MasterTableService, private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    const routeParams = this.route.snapshot.paramMap;
    this.labId = routeParams.get('labId');
    let date = new Date();
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this.shortDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this.shortDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
  ngOnInit(): void {
    this.GatLabDetails();
    this.getCities();
    this.getLabFacilities();
  }
  GatLabDetails() {
    this.adminService.getLabbyId(this.labId).subscribe(
      (dt) => {
        this.lab = {
          image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
          coverImage: dt.data.coverImage == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.coverImage,
          hours: this.CalculateHours(new Date(dt.data.closingTime), new Date(dt.data.openingTime)),
          labId: dt.data.labId,
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
          uploadImage: dt.data.uploadImage,
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
          this.cityId = this.cities[0];
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
  getLabFacilities() {
    this.adminService.getLabsFacilitiesById(this.labId).subscribe(
      (dt) => {
        this.labFacilities = [];
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
          this.labFacilities.push(facility);
          this.dataSource = new MatTableDataSource(this.labFacilities);
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
  cancelBtn() {
    this.showAddCancelBtn = 0;
  }
  onSubmitAddFacility() {
    this.errorMessage = '';
    this.addLoading = true;
    for (let c = 0; c < this.labFacilities.length; c++) {
      if (this.labFacilities[c].isAdded == false) {
        this.adminService.AddFacility(this.labFacilities[c]).subscribe(
          (dt) => {
            this.getLabFacilities();
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
  changeIsSelectedFlagInRadiology(data: any) {
    for (let i = 0; i < this.labFacilities.length; i++) {
      if (this.labFacilities[i].facilityId == data.facilityId) {
        this.labFacilities[i].isSelected = true;
      } else {
        this.labFacilities[i].isSelected = false;
      }
    }
  }
  changeDeSelectedFlagInRadiology(data: any) {
    for (let i = 0; i < this.labFacilities.length; i++) {
      if (this.labFacilities[i].facilityId == data.facilityId) {
        this.labFacilities[i].isSelected = false;
        this.getLabFacilities();
      }
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
      labId: this.labId,
      hospitalId: null,
      isAdded: false,
      isSelected: false,
      facilityCategoryId: null,
    };
    this.labFacilities.splice(this.labFacilities.length + 1, 0, facility);
    this.dataSource = new MatTableDataSource(this.labFacilities);
    this.addCancelBtn('add');
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
        this.showAddCancelBtn = 0;
        this.addLoading = false;
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        this.addLoading = false;
        this.errorMessage = error.error.message;
        this.getLabFacilities();
      }
    );
  }
  onUpdateCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverImageFormData.append('image', file, file.name);
      this.addLoading = true;
      this.adminService.AddLabCoverImage(this.labId, this.coverImageFormData).subscribe(
        (data) => {
          this.GatLabDetails();
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
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  EditLabModal(Item: any) {
    this.coverImageFormData = new FormData();
    this.labImageFormData = new FormData();
    this.labImage = this.lab.image;
    this.labImageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    let splitOpeningTime = this.lab.openingTime.split('-');
    let substringsplitOpeningTime = splitOpeningTime[2].slice(3, -7);
    let openingTime = substringsplitOpeningTime;

    let splitclosingTime = this.lab.closingTime.split('-');
    let substringsplitclosingTime = splitclosingTime[2].slice(3, -7);
    let closingTime = substringsplitclosingTime;

    this.EditLabForm = this.formBuilder.group({
      name: [this.lab.name, Validators.required],
      address: [this.lab.address, Validators.required],
      phoneNumber: [this.lab.phoneNumber, Validators.required],
      openingTime: [openingTime, Validators.required],
      closingTime: [closingTime, Validators.required],
      mon: [this.lab.mon],
      tus: [this.lab.tus],
      wed: [this.lab.wed],
      thur: [this.lab.thur],
      fri: [this.lab.fri],
      sat: [this.lab.sat],
      sun: [this.lab.sun],
      cityId: [this.lab.cityId, Validators.required],
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
  onSubmitEditLab() {
    this.errorMessage = '';
    let values = this.EditLabForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772';

    if (this.EditLabForm.valid) {
      this.labImageFormData.append('name', this.EditLabForm.get('name').value);
      this.labImageFormData.append('address', this.EditLabForm.get('address').value);
      this.labImageFormData.append('phoneNumber', this.EditLabForm.get('phoneNumber').value);
      this.labImageFormData.append('openingTime', values.openingTime);
      this.labImageFormData.append('closingTime', values.closingTime);
      this.labImageFormData.append('mon', this.EditLabForm.get('mon').value);
      this.labImageFormData.append('tus', this.EditLabForm.get('tus').value);
      this.labImageFormData.append('wed', this.EditLabForm.get('wed').value);
      this.labImageFormData.append('thur', this.EditLabForm.get('thur').value);
      this.labImageFormData.append('fri', this.EditLabForm.get('fri').value);
      this.labImageFormData.append('sat', this.EditLabForm.get('sat').value);
      this.labImageFormData.append('sun', this.EditLabForm.get('sun').value);
      this.labImageFormData.append('cityId', this.EditLabForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.Loading = true;
        this.adminService.UpdateLab(this.labId, this.labImageFormData).subscribe(
          (dt) => {
            this.lab = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
              coverImage: dt.data.coverImage,
              hours: this.CalculateHours(new Date(dt.data.closingTime), new Date(dt.data.openingTime)),
              labId: dt.data.labId,
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
              uploadImage: dt.data.uploadImage,
            };
            this.labImageFormData = new FormData();
            this.modalService.dismissAll();
            this.Loading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.Loading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  onUpdateLabImage(event: any) {
    this.labImageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.labImageFormData.append('UploadImage', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.labImageURL.push(reader.result);
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
}
