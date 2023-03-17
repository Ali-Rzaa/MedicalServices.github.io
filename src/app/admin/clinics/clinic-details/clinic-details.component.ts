import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent {
  coverImageURL: any[] = [];
  doctorImageURL: any[] = [];
  AddDoctorForm!: FormGroup;
  closeModal: string = '';
  coverImageFormData: FormData = new FormData();
  doctorImageFormData: FormData = new FormData();
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}

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
}
