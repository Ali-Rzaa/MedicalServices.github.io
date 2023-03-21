import { Component } from '@angular/core';
import { city, ClinicModel, Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
})
export class ClinicsComponent {
  AddClinicForm!: FormGroup;
  closeModal: string = '';
  dataSource: any;
  imageURL: any[] = [];
  ImageFormData: FormData = new FormData();
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening'];
  clinics: ClinicModel[] = [];
  selectedCity = 'Select City';
  showDropdown = false;
  product: any;
  cities: city[] = [];
  addClinicLoading: boolean = false;
  dltErrorMessages: string = '';
  deleteLoading: boolean = false;
  errorMessage: string = '';
  shortDate: any;
  cityId: string = '';
  dateErrorMessage: string = '';
  clinicId: string = '';
  clinicIndex: number;
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
    this.getClinics();
    this.getCities();
  }

  getClinics() {
    this.adminService.getClinic().subscribe(
      (dt) => {
        this.clinics = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let clinic: ClinicModel = {
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt[a].productImage,
            coverImage: data[a].coverImage,
            clinicId: data[a].clinicId,
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
          this.clinics.push(clinic);
        }
        this.dataSource = new MatTableDataSource(this.clinics);
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
  AddClinicrModal(Item: any) {
    this.imageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    this.addClinicLoading = false;
    this.AddClinicForm = this.formBuilder.group({
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
      cityId: [this.cityId, Validators.required],
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
  onSubmitAddClinic() {
    this.errorMessage = '';
    let values = this.AddClinicForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';
    if (this.AddClinicForm.valid) {
      // this.hospitalImageFormData.append('name', this.AddHospitalForm.get('name').value);
      // this.hospitalImageFormData.append('address', this.AddHospitalForm.get('address').value);
      // this.hospitalImageFormData.append('phoneNumber', this.AddHospitalForm.get('phoneNumber').value);
      // this.hospitalImageFormData.append('openingTime', this.AddHospitalForm.get('openingTime').value);
      // this.hospitalImageFormData.append('closingTime', this.AddHospitalForm.get('closingTime').value);
      // this.hospitalImageFormData.append('mon', this.AddHospitalForm.get('mon').value);
      // this.hospitalImageFormData.append('tus', this.AddHospitalForm.get('tus').value);
      // this.hospitalImageFormData.append('wed', this.AddHospitalForm.get('wed').value);
      // this.hospitalImageFormData.append('thur', this.AddHospitalForm.get('thur').value);
      // this.hospitalImageFormData.append('fri', this.AddHospitalForm.get('fri').value);
      // this.hospitalImageFormData.append('sat', this.AddHospitalForm.get('sat').value);
      // this.hospitalImageFormData.append('sun', this.AddHospitalForm.get('sun').value);
      // this.hospitalImageFormData.append('cityId', this.AddHospitalForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addClinicLoading = true;
        this.adminService.AddClinic(values).subscribe(
          (dt) => {
            let clinic: ClinicModel = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.productImage,
              coverImage: dt.data.coverImage,
              clinicId: dt.data.clinicId,
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
            this.clinics.unshift(clinic);
            this.dataSource = new MatTableDataSource(this.clinics);
            this.addClinicLoading = false;
            this.modalService.dismissAll();
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addClinicLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  onUpdateImage(event: any) {
    this.imageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ImageFormData.append('Image', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageURL.push(reader.result);
      };
    }
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
          this.cityId = this.cities[0].cityId;
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
  DeleteClinicModel(Item: any, clinicId: any, index: any) {
    this.clinicId = clinicId;
    this.clinicIndex = index;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteClinic() {
    this.dltErrorMessages = '';
    this.deleteLoading = true;
    this.adminService.deteleClinic(this.clinicId).subscribe(
      (dt) => {
        this.clinics.splice(this.clinicIndex, 1);
        this.dataSource = new MatTableDataSource(this.clinics);
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
