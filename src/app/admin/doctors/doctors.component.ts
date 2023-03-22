import { Component } from '@angular/core';
import { ClinicModel, Doctor, DoctorModel, HospitalModel, Type } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { MasterTableService } from 'src/app/services/Admin/master-table.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
  AddDoctorForm!: FormGroup;
  EditDoctorForm!: FormGroup;
  closeModal: string = '';
  dataSource: any;
  imageURL: any[] = [];
  ImageFormData: FormData = new FormData();
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening', 'hospital', 'status'];
  doctors: DoctorModel[] = [];
  selectedCity = 'Select City';
  showDropdown = false;
  product: any;
  clinics: ClinicModel[] = [];
  hospitals: HospitalModel[] = [];
  types: Type[] = [];
  isClinic: string = '1';
  errorMessage: string = '';
  dateErrorMessage: string = '';
  dltErrorMessages: string = '';
  shortDate: any;
  addLoading: boolean = false;
  deleteLoading: boolean = false;
  ClinicId: string = '';
  HospitalId: string = '';
  doctorId: string = '';
  TypeId: string = '';
  drImage: string = '';
  _doctorId: string = '';
  doctorIndex: number;
  constructor(private masterTableService: MasterTableService, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    let date = new Date();
    let _date = date.getMonth() + 1;
    if (_date < 10) {
      this.shortDate = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else {
      this.shortDate = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
  ngOnInit(): void {
    this.getDoctors();
    this.getDoctortypes();
    this.getHospital();
    this.getClinics();
  }
  HospiatlOrClinic(value: any) {
    this.isClinic = value.value;
  }
  getDoctors() {
    this.adminService.getDoctor().subscribe(
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
        this.dataSource = new MatTableDataSource(this.doctors);
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
  getDoctortypes() {
    this.masterTableService.getDoctorTypes().subscribe(
      (dt) => {
        this.doctors = [];
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
  getClinics() {
    this.adminService.getClinic().subscribe(
      (dt) => {
        this.clinics = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let clinic: ClinicModel = {
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : data[a].image,
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
            hours: '',
          };
          this.clinics.push(clinic);
          this.ClinicId = this.clinics[0].clinicId;
        }
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
            hours: '',
          };
          this.hospitals.push(hospital);
          this.HospitalId = this.hospitals[0].hospitalId;
        }
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
  AddDoctorModal(Item: any) {
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
      hospitalId: [this.HospitalId],
      clinicId: [this.ClinicId],
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
    let hospitalId = '';
    let clinicId = '';
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';
    if (this.isClinic == '1') {
      hospitalId = values.hospitalId;
    } else {
      clinicId = values.clinicId;
    }
    if (this.AddDoctorForm.valid) {
      this.ImageFormData.append('Name', this.AddDoctorForm.get('name').value);
      this.ImageFormData.append('Fee', this.AddDoctorForm.get('fee').value);
      this.ImageFormData.append('Field', this.AddDoctorForm.get('field').value);
      this.ImageFormData.append('Description', this.AddDoctorForm.get('description').value);
      this.ImageFormData.append('PhoneNumber', this.AddDoctorForm.get('phoneNumber').value);
      this.ImageFormData.append('Experience', this.AddDoctorForm.get('experience').value);
      this.ImageFormData.append('OpeningTime', values.openingTime);
      this.ImageFormData.append('ClosingTime', values.closingTime);
      this.ImageFormData.append('Mon', this.AddDoctorForm.get('mon').value);
      this.ImageFormData.append('Tus', this.AddDoctorForm.get('tus').value);
      this.ImageFormData.append('Wed', this.AddDoctorForm.get('wed').value);
      this.ImageFormData.append('Thur', this.AddDoctorForm.get('thur').value);
      this.ImageFormData.append('Fri', this.AddDoctorForm.get('fri').value);
      this.ImageFormData.append('Sat', this.AddDoctorForm.get('sat').value);
      this.ImageFormData.append('Sun', this.AddDoctorForm.get('sun').value);
      this.ImageFormData.append('TypeId', this.AddDoctorForm.get('typeId').value);
      this.ImageFormData.append('HospitalId', hospitalId);
      this.ImageFormData.append('ClinicId', clinicId);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addLoading = true;
        this.adminService.AddDoctor(this.ImageFormData).subscribe(
          (dt) => {
            this.getDoctors();
            this.ImageFormData = new FormData();
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
    // if (data.hospitalId == null) {
    //   this.isClinic = '2';
    // } else {
    //   this.isClinic = '1';
    // }
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
      // hospitalId: [data.hospitalId],
      // clinicId: [data.clinicId],
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
    // let _hospitalId = '';
    // let _clinicId = '';
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';
    // if (this.isClinic == '1') {
    //   _hospitalId = values.hospitalId;
    // } else {
    //   _clinicId = values.clinicId;
    // }
    if (this.EditDoctorForm.valid) {
      this.ImageFormData.append('Name', this.EditDoctorForm.get('name').value);
      this.ImageFormData.append('Fee', this.EditDoctorForm.get('fee').value);
      this.ImageFormData.append('Field', this.EditDoctorForm.get('field').value);
      this.ImageFormData.append('Description', this.EditDoctorForm.get('description').value);
      this.ImageFormData.append('PhoneNumber', this.EditDoctorForm.get('phoneNumber').value);
      this.ImageFormData.append('Experience', this.EditDoctorForm.get('experience').value);
      this.ImageFormData.append('OpeningTime', values.openingTime);
      this.ImageFormData.append('ClosingTime', values.closingTime);
      this.ImageFormData.append('Mon', this.EditDoctorForm.get('mon').value);
      this.ImageFormData.append('Tus', this.EditDoctorForm.get('tus').value);
      this.ImageFormData.append('Wed', this.EditDoctorForm.get('wed').value);
      this.ImageFormData.append('Thur', this.EditDoctorForm.get('thur').value);
      this.ImageFormData.append('Fri', this.EditDoctorForm.get('fri').value);
      this.ImageFormData.append('Sat', this.EditDoctorForm.get('sat').value);
      this.ImageFormData.append('Sun', this.EditDoctorForm.get('sun').value);
      this.ImageFormData.append('TypeId', this.EditDoctorForm.get('typeId').value);
      // this.ImageFormData.append('HospitalId', _hospitalId);
      // this.ImageFormData.append('ClinicId', _clinicId);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addLoading = true;
        this.adminService.UpdateDoctor(this.doctorId, this.ImageFormData).subscribe(
          (dt) => {
            this.getDoctors();
            this.ImageFormData = new FormData();
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
  DeleteDoctorModel(Item: any, doctorId: any, index: any) {
    this._doctorId = doctorId;
    this.doctorIndex = index;
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
        this.getDoctors();
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
  onUpdateImage(event: any) {
    this.imageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ImageFormData.append('UploadImage', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageURL.push(reader.result);
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
}
