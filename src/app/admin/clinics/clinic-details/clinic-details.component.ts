import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { city, ClinicModel, DoctorModel, Type } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { AdminService } from 'src/app/services/Admin/admin.service';
import { MasterTableService } from 'src/app/services/Admin/master-table.service';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent {
  coverImageURL: any[] = [];
  ClinicImageURL: any[] = [];
  imageURL: any[] = [];
  cities: city[] = [];
  doctors: DoctorModel[] = [];
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
  EditDoctorForm!: FormGroup;
  EditClinicForm!: FormGroup;
  closeModal: string = '';
  coverImageFormData: FormData = new FormData();
  doctorImageFormData: FormData = new FormData();
  clinicImageFormData: FormData = new FormData();
  editClinicLoading: boolean = false;
  errorMessage: string = '';
  dateErrorMessage: string = '';
  shortDate: any;
  clinicId: string;
  clinicImage: any;
  types: Type[] = [];
  TypeId: any;
  drImage: any;
  doctorId: any;
  addLoading: boolean = false;
  constructor(private masterTableService: MasterTableService, private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
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
    this.getDoctorsByClinicId();
    this.getCities();
    this.getDoctortypes();
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
  GatClinicDetails() {
    this.adminService.getClinicbyId(this.clinicId).subscribe(
      (dt) => {
        this.clinic = {
          image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
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
  getDoctorsByClinicId() {
    this.adminService.getDoctorbyClinicId(this.clinicId).subscribe(
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
    this.clinicImage = this.clinic.image;
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
      this.clinicImageFormData.append('Name', this.EditClinicForm.get('name').value);
      this.clinicImageFormData.append('Address', this.EditClinicForm.get('address').value);
      this.clinicImageFormData.append('PhoneNumber', this.EditClinicForm.get('phoneNumber').value);
      this.clinicImageFormData.append('OpeningTime', values.openingTime);
      this.clinicImageFormData.append('ClosingTime', values.closingTime);
      this.clinicImageFormData.append('Mon', this.EditClinicForm.get('mon').value);
      this.clinicImageFormData.append('Tus', this.EditClinicForm.get('tus').value);
      this.clinicImageFormData.append('Wed', this.EditClinicForm.get('wed').value);
      this.clinicImageFormData.append('Thur', this.EditClinicForm.get('thur').value);
      this.clinicImageFormData.append('Fri', this.EditClinicForm.get('fri').value);
      this.clinicImageFormData.append('Sat', this.EditClinicForm.get('sat').value);
      this.clinicImageFormData.append('Sun', this.EditClinicForm.get('sun').value);
      this.clinicImageFormData.append('CityId', this.EditClinicForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.editClinicLoading = true;
        this.adminService.UpdateClinic(this.clinicId, this.clinicImageFormData).subscribe(
          (dt) => {
            this.clinic = {
              image: dt.data.image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt.data.image,
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
            this.clinicImageFormData = new FormData();
            this.coverImageURL = [];
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
  // onUpdateCoverImage(event: any) {
  //   this.coverImageURL = [];
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.coverImageFormData.append('UploadImage', file, file.name);
  //     var reader = new FileReader();
  //     //this.imagePath = files;
  //     reader.readAsDataURL(file);
  //     reader.onload = (_event) => {
  //       this.coverImageURL.push(reader.result);
  //     };
  //   }
  // }
  onUpdateClinicImage(event: any) {
    this.ClinicImageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.clinicImageFormData.append('UploadImage', file, file.name);
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.ClinicImageURL.push(reader.result);
      };
    }
  }
  onUpdateCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverImageFormData.append('image', file, file.name);
      this.addLoading = true;
      this.adminService.AddClinicImage(this.clinicId, this.coverImageFormData).subscribe(
        (data) => {
          this.GatClinicDetails();
          this.addLoading = false;
        },
        (error) => {
          if (error.status == 401) {
            this.accountService.doLogout();
            this.router.navigateByUrl('/');
          }
          console.log('Error in onProfilePictureChange: ' + error.message);
        }
      );
    }
  }
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  AddDoctorModal(Item: any) {
    this.imageURL = [];
    this.addLoading = false;
    this.errorMessage = '';
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
      this.doctorImageFormData.append('HospitalId', '');
      this.doctorImageFormData.append('ClinicId', this.clinicId);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.addLoading = true;
        this.adminService.AddDoctor(this.doctorImageFormData).subscribe(
          (dt) => {
            this.getDoctorsByClinicId();
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
            this.getDoctorsByClinicId();
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
