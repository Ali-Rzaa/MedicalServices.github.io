import { Component } from '@angular/core';
import { ClinicModel, Doctor, DoctorModel } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
  AddDoctorForm!: FormGroup;
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
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.getDoctors();
    this.getClinics();
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
            image: data[a].image == null ? 'https://static.marham.pk/assets/images/hospital-default.jpg' : dt[a].productImage,
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
        console.log('Error in getHospital ' + error.message);
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
            hours: '',
          };
          this.clinics.push(clinic);
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
