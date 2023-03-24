import { Component } from '@angular/core';
import { city, Doctor, LabModel } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent {
  AddLabForm!: FormGroup;
  closeModal: string = '';
  dateErrorMessage: string = '';
  errorMessage: string = '';
  dataSource: any;
  imageURL: any[] = [];
  ImageFormData: FormData = new FormData();
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening'];
  labs: LabModel[] = [];
  cities: city[] = [];
  selectedCity = 'Select City';
  showDropdown = false;
  product: any;
  Loading: boolean = false;
  shortDate: any;
  dltErrorMessages: string = '';
  deleteLoading: boolean = false;
  labId: string = '';
  labIndex: number;
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
    this.getLabs();
    this.getCities();
  }

  getLabs() {
    this.adminService.getLabs().subscribe(
      (dt) => {
        this.labs = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let lab: LabModel = {
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : data[a].image,
            coverImage: data[a].coverImage,
            hours: this.CalculateHours(new Date(data[a].closingTime), new Date(data[a].openingTime)),
            labId: data[a].labId,
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
            uploadImage: data[a].uploadImage,
          };
          this.labs.push(lab);
        }
        this.dataSource = new MatTableDataSource(this.labs);
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
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  AddLabModal(Item: any) {
    this.ImageFormData = new FormData();
    this.imageURL = [];
    this.dateErrorMessage = '';
    this.errorMessage = '';
    this.AddLabForm = this.formBuilder.group({
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
  onSubmitAddLab() {
    this.errorMessage = '';
    let values = this.AddLabForm.value;
    values.openingTime = this.shortDate + 'T' + values.openingTime + ':00.772Z';
    values.closingTime = this.shortDate + 'T' + values.closingTime + ':00.772Z';

    if (this.AddLabForm.valid) {
      this.ImageFormData.append('Name', this.AddLabForm.get('name').value);
      this.ImageFormData.append('Address', this.AddLabForm.get('address').value);
      this.ImageFormData.append('PhoneNumber', this.AddLabForm.get('phoneNumber').value);
      this.ImageFormData.append('OpeningTime', values.openingTime);
      this.ImageFormData.append('ClosingTime', values.closingTime);
      this.ImageFormData.append('Mon', this.AddLabForm.get('mon').value);
      this.ImageFormData.append('Tus', this.AddLabForm.get('tus').value);
      this.ImageFormData.append('Wed', this.AddLabForm.get('wed').value);
      this.ImageFormData.append('Thur', this.AddLabForm.get('thur').value);
      this.ImageFormData.append('Fri', this.AddLabForm.get('fri').value);
      this.ImageFormData.append('Sat', this.AddLabForm.get('sat').value);
      this.ImageFormData.append('Sun', this.AddLabForm.get('sun').value);
      this.ImageFormData.append('CityId', this.AddLabForm.get('cityId').value);
      if (values.openingTime > values.closingTime) {
        this.dateErrorMessage = 'Start time sholud be greated then End time';
      } else {
        this.Loading = true;
        this.adminService.AddLab(this.ImageFormData).subscribe(
          (dt) => {
            let lab: LabModel = {
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
            this.labs.push(lab);
            this.dataSource = new MatTableDataSource(this.labs);
            this.ImageFormData = new FormData();
            this.Loading = false;
            this.modalService.dismissAll();
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
  DeleteLabModel(Item: any, labId: any, index: any) {
    this.dltErrorMessages = '';
    this.deleteLoading = false;
    this.labId = labId;
    this.labIndex = index;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteLab() {
    this.dltErrorMessages = '';
    this.deleteLoading = true;
    this.adminService.deteleLab(this.labId).subscribe(
      (dt) => {
        this.labs.splice(this.labIndex, 1);
        this.dataSource = new MatTableDataSource(this.labs);
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
