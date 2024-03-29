import { Component } from '@angular/core';
import { city, Doctor, HospitalModel } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent {
  dataSource: any;
  AddHospitalForm!: FormGroup;
  closeModal: string = '';
  coverImageURL: any[] = [];
  hospitalImageURL: any[] = [];
  hospitalImageFormData: FormData = new FormData();
  coverImageFormData: FormData = new FormData();
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening'];
  hospitals: HospitalModel[] = [];
  errorMessage: string = '';
  dltErrorMessages: string = '';
  deleteLoading: boolean = false;
  addHospitalLoading: boolean = false;
  cities: city[] = [];
  sun: boolean = false;
  mon: boolean = false;
  tue: boolean = false;
  wed: boolean = false;
  thru: boolean = false;
  fri: boolean = false;
  sat: boolean = false;
  shortDate: any;
  hospitalId: string = '';
  hospitalIndex: number;
  dateErrorMessage: string = '';
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    let date = new Date();
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this.shortDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this.shortDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }

  ngOnInit(): void {
    this.getHospital();
    this.getCities();
  }

  getHospital() {
    this.adminService.getHospital().subscribe(
      (dt) => {
        this.hospitals = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let hospital: HospitalModel = {
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : data[a].image,
            coverImage: data[a].coverImage,
            hospitalId: data[a].hospitalId,
            createdDateTime: data[a].createdDateTime,
            modifiedDateTime: data[a].modifiedDateTime,
            modifiedBy: data[a].modifiedBy,
            createdBy: data[a].createdBy,
            cityName: data[a].cityName,
            name: data[a].name,
            address: data[a].address,
            phoneNumber: data[a].phoneNumber,
            openingTime: data[a].openingTime,
            closingTime: data[a].closingTime,
            mon: data[a].mon,
            tus: data[a].tus,
            wed: data[a].wed,
            thur: data[a].thur,
            fri: data[a].fri,
            sat: data[a].sat,
            sun: data[a].sun,
            cityId: data[a].cityId,
            hours: this.CalculateHours(new Date(data[a].closingTime), new Date(data[a].openingTime)),
          };
          this.hospitals.push(hospital);
        }
        this.dataSource = new MatTableDataSource(this.hospitals);
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getHospital ' + error.message);
      }
    );
  }
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  AddHospitalModal(Item: any) {
    this.hospitalImageFormData = new FormData();
    this.coverImageFormData = new FormData();
    this.hospitalImageURL = [];
    this.coverImageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    this.AddHospitalForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      mon: [false],
      tus: [false],
      wed: [false],
      thur: [false],
      fri: [false],
      sat: [false],
      sun: [false],
      cityId: ['', Validators.required],
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
  onSubmitAddHospital() {
    this.errorMessage = '';
    let values = this.AddHospitalForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';

    if (this.AddHospitalForm.valid) {
      this.hospitalImageFormData.append('Name', this.AddHospitalForm.get('name').value);
      this.hospitalImageFormData.append('Address', this.AddHospitalForm.get('address').value);
      this.hospitalImageFormData.append('PhoneNumber', this.AddHospitalForm.get('phoneNumber').value);
      this.hospitalImageFormData.append('OpeningTime', values.openingTime);
      this.hospitalImageFormData.append('ClosingTime', values.closingTime);
      this.hospitalImageFormData.append('Mon', this.AddHospitalForm.get('mon').value);
      this.hospitalImageFormData.append('Tus', this.AddHospitalForm.get('tus').value);
      this.hospitalImageFormData.append('Wed', this.AddHospitalForm.get('wed').value);
      this.hospitalImageFormData.append('Thur', this.AddHospitalForm.get('thur').value);
      this.hospitalImageFormData.append('Fri', this.AddHospitalForm.get('fri').value);
      this.hospitalImageFormData.append('Sat', this.AddHospitalForm.get('sat').value);
      this.hospitalImageFormData.append('Sun', this.AddHospitalForm.get('sun').value);
      this.hospitalImageFormData.append('CityId', this.AddHospitalForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addHospitalLoading = true;
        this.adminService.AddHospital(this.hospitalImageFormData).subscribe(
          (dt) => {
            let hospital: HospitalModel = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
              coverImage: dt.data.coverImage,
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
            this.hospitals.unshift(hospital);
            this.dataSource = new MatTableDataSource(this.hospitals);
            this.hospitalImageFormData = new FormData();
            this.addHospitalLoading = false;
            this.modalService.dismissAll();
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addHospitalLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  onUpdateCoverImage(event: any) {
    this.coverImageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverImageFormData.append('Image', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.coverImageURL.push(reader.result);
      };
    }
  }
  onUpdateUserImage(event: any) {
    this.hospitalImageURL = [];
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
  DeleteHospitalModel(Item: any, hospitalId: any, index: any) {
    this.dltErrorMessages = '';
    this.deleteLoading = false;
    this.hospitalId = hospitalId;
    this.hospitalIndex = index;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteHospital() {
    this.dltErrorMessages = '';
    this.deleteLoading = true;
    this.adminService.deteleHospital(this.hospitalId).subscribe(
      (dt) => {
        this.hospitals.splice(this.hospitalIndex, 1);
        this.dataSource = new MatTableDataSource(this.hospitals);
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
