import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { city, ClinicModel } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent {
  coverImageURL: any[] = [];
  doctorImageURL: any[] = [];
  cities: city[] = [];
  clinic: ClinicModel = {
    image: '',
    coverImage: '',
    clinicId: '',
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
  AddDoctorForm!: FormGroup;
  EditClinicForm!: FormGroup;
  closeModal: string = '';
  coverImageFormData: FormData = new FormData();
  doctorImageFormData: FormData = new FormData();
  editClinicLoading: boolean = false;
  errorMessage: string = '';
  dateErrorMessage: string = '';
  shortDate: any;
  clinicId: string;
  constructor(private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    const routeParams = this.route.snapshot.paramMap;
    this.clinicId = routeParams.get('clinicId');
    let date = new Date();
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this.shortDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this.shortDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
  ngOnInit(): void {
    this.GatClinicDetails();
    this.getCities();
  }

  GatClinicDetails() {
    this.adminService.getClinicbyId(this.clinicId).subscribe(
      (dt) => {
        this.clinic = {
          image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.productImage,
          coverImage: dt.data.coverImage == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.coverImage,
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
  EditClinicModal(Item: any) {
    this.dateErrorMessage = '';
    this.errorMessage = '';
    this.coverImageURL = [];
    let splitOpeningTime = this.clinic.openingTime.split('-');
    let substringsplitOpeningTime = splitOpeningTime[2].slice(3, -7);
    let openingTime = substringsplitOpeningTime;

    let splitclosingTime = this.clinic.closingTime.split('-');
    let substringsplitclosingTime = splitclosingTime[2].slice(3, -7);
    let closingTime = substringsplitclosingTime;

    this.EditClinicForm = this.formBuilder.group({
      name: [this.clinic.name, Validators.required],
      address: [this.clinic.address, Validators.required],
      phoneNumber: [this.clinic.phoneNumber, Validators.required],
      openingTime: [openingTime, Validators.required],
      closingTime: [closingTime, Validators.required],
      mon: [this.clinic.mon],
      tus: [this.clinic.tus],
      wed: [this.clinic.wed],
      thur: [this.clinic.thur],
      fri: [this.clinic.fri],
      sat: [this.clinic.sat],
      sun: [this.clinic.sun],
      cityId: [this.clinic.cityId, Validators.required],
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
  onSubmitUpdateClinic() {
    this.errorMessage = '';
    this.dateErrorMessage = '';
    let values = this.EditClinicForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772';

    if (this.EditClinicForm.valid) {
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
        this.editClinicLoading = true;
        this.adminService.UpdateClinic(this.clinicId, values).subscribe(
          (dt) => {
            this.clinic = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.productImage,
              coverImage: dt.data.coverImage == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.coverImage,
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
            this.modalService.dismissAll();
            this.editClinicLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.editClinicLoading = false;
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
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  AddDoctorModal(Item: any) {
    this.doctorImageURL = [];
    this.AddDoctorForm = this.formBuilder.group({
      Name: [''],
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
  EditHospitalModal(Item: any) {
    this.coverImageURL = [];
    this.AddDoctorForm = this.formBuilder.group({
      Name: [''],
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
  onSubmitAddDoctor() {}
  onUpdateDoctorImage(event: any) {
    this.doctorImageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.doctorImageFormData.append('Image', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.doctorImageURL.push(reader.result);
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
}
