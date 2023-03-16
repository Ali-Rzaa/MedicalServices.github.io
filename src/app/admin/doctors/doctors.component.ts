import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
  AddDoctorForm!: FormGroup;
  closeModal: string = '';
  dataSource: any;
  columnsToDisplay: string[] = ['icon', 'image', 'name', 'address', 'phoneNo', 'opening', 'hospital', 'status'];
  doctors: Doctor[] = [];
  constructor(private modalService: NgbModal) {}
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
  AddDoctorModal(Item: any) {
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  onSubmitAddDoctor() {}
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
