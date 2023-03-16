import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent {
  dataSource: any;
  AddDoctorForm!: FormGroup;
  closeModal: string = '';
  imageURL: any[] = [];
  ImageFormData: FormData = new FormData();
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening'];
  doctors: Doctor[] = [];
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.getDoctors();
  }
  getDoctors() {
    this.doctors = [];
    for (let a = 0; a < 10; a++) {
      let doctor: Doctor = {
        image: '',
        name: '',
        address: '',
        phoneNo: '',
        openning: '',
      };
      this.doctors.push(doctor);
    }
    this.dataSource = new MatTableDataSource(this.doctors);
  }

  CancelPopUp() {
    this.modalService.dismissAll();
  }
  AddHospitalModal(Item: any) {
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
